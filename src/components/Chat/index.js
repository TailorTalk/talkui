import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  List,
  ListItem,
  Paper,
  LinearProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MemoryIcon from "@mui/icons-material/Memory";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../../contexts/AuthContext";

function ChatComponent({ pastChatHistory, onMessageSend, sessionId, ongoing }) {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(pastChatHistory);
  const chatEndRef = useRef(null);
  const {userInfo} = useAuth();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // console.log("akash", "I received new history", pastChatHistory)
    setChatHistory(pastChatHistory);
    scrollToBottom();
  }, [pastChatHistory]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputMessage.trim()) {
      // console.log("akash", "Message after enter", inputMessage, chatHistory);
      if (chatHistory) {
        const chatHistoryCopy = { ...chatHistory };
        chatHistoryCopy.result.history.push({
          role: "user",
          content: inputMessage,
        });
        setChatHistory(chatHistoryCopy);
      } else {
        setChatHistory({
          success: true,
          result: { history: [{ role: "user", content: inputMessage }] },
        });
      }
      onMessageSend(inputMessage, sessionId);
      setInputMessage(""); // Clear the input box
    }
  };

  return (
    <div className="flex flex-col bg-[#f9f9fa]  justify-between h-full">
      {chatHistory && chatHistory.success ? (
        <List
          style={{
            overflowY: "scroll",
            flexGrow: 1,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flexBasis:0,
          }}
        >
          {chatHistory.result.history.map((msg, index) => (
    <ListItem>
    <div className={`w-full flex items-center   ${msg.role === "user"?'flex  flex-row-reverse gap-2 !justify-start ':''}`}>
      <ListItemAvatar>
          {msg.role === "user" ?  <Avatar alt="User" src={userInfo.picture} /> : <Avatar><MemoryIcon /></Avatar>}        
      </ListItemAvatar>
      <ListItemText primary={msg.content} className={`max-w-[80%] border-2 rounded-2xl p-4 relative whitespace-normal break-words !flex-grow-0 ${msg.role === "user"?'bg-tailorBlue-500 text-white':'bg-white'} `} />
    </div>
  </ListItem>
          ))}
          <div ref={chatEndRef}></div>
        </List>
      ) : (
        <div
          ref={chatEndRef}
          style={{ overflowY: "auto", flexGrow: 1, padding: "1rem" }}
        ></div>
      )}
      {ongoing && <LinearProgress sx={{ height: "4px" }} />}
      <TextField
        variant="outlined"
        value={inputMessage}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        fullWidth
        sx={{
          padding: "10px",
        }}
      />
    </div>
  );
}

export default ChatComponent;
