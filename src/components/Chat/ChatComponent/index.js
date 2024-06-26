import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  List,
  ListItem,
  Paper,
  LinearProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MemoryIcon from "@mui/icons-material/Memory";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../../../contexts/AuthContext";
import { Send } from "@mui/icons-material";

function ChatMessage({ msg, userInfo }) {

  return (
    <div
      className={`w-full flex items-center  ${
        msg.role === "user"
          ? "flex  flex-row-reverse gap-2 !justify-start "
          : ""
      }`}
    >
      <ListItemAvatar>
        {msg.role === "user" ? (
          <Avatar alt="User" src={userInfo.picture} />
        ) : (
          <Avatar>
            <MemoryIcon />
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={msg.content}
        className={`max-w-[80%] border-[1.4px] rounded-2xl p-4 relative whitespace-normal break-words !flex-grow-0 ${
          msg.role === "user"
            ? "bg-tailorBlue-500 text-white border-tailorBlue-500"
            : "bg-white border-[#cfcfcf9d]"
        } `}
      />
    </div>
  );
}

function ChatComponent({
  pastChatHistory,
  onMessageSend,
  sessionId,
  ongoing,
  disable,
  chats=undefined,
}) {
  console.log(pastChatHistory);
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(pastChatHistory);
  const chatEndRef = useRef(null);
  const { userInfo } = useAuth();

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

  // const previousChats = (
  //   <List
  //     style={{
  //       overflowY: "scroll",
  //       flexGrow: 1,
  //       padding: "1rem",
  //       display: "flex",
  //       flexDirection: "column",
  //       gap: "20px",
  //       flexBasis: 0,
  //     }}
  //   >

  //   </List>
  // );

  // const onGoingChats = (
  //   <List
  //     style={{
  //       overflowY: "scroll",
  //       flexGrow: 1,
  //       padding: "1rem",
  //       display: "flex",
  //       flexDirection: "column",
  //       gap: "20px",
  //       flexBasis: 0,
  //     }}
  //   >
  //     {chatHistory.result.history.map((msg, index) => (
  //       <ListItem key={index}>
  //         <ChatMessage msg={msg} userInfo={userInfo} />
  //       </ListItem>
  //     ))}
  //     <div ref={chatEndRef}></div>
  //   </List>
  // );

  return (
    <div className="flex flex-col bg-[#f9f9fa]  justify-between h-full">
      <List
        style={{
          overflowY: "scroll",
          flexGrow: 1,
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          flexBasis: 0,
        }}
      >
        {chats ? (
          chats.map((msg, index) => (
          
            <ListItem key={index}>
              <ChatMessage msg={msg} userInfo={userInfo} />
            </ListItem>
          ))
        ) : chatHistory && chatHistory.success ? (
          <>
            {chatHistory.result.history.map((msg, index) => (
              <ListItem key={index}>
                <ChatMessage msg={msg} userInfo={userInfo} />
              </ListItem>
            ))}
            <div ref={chatEndRef}></div>
          </>
        ) : (
          <div
            ref={chatEndRef}
            style={{ overflowY: "auto", flexGrow: 1, padding: "1rem" }}
          ></div>
        )}
      </List>

      {ongoing && <LinearProgress sx={{ height: "4px" }} />}
      <TextField
        variant="outlined"
        value={inputMessage}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        fullWidth
        disabled={disable}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="send" onClick={handleKeyPress}>
                <Send />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            color: "#717171",
            backgroundColor: "#fff",
          },
        }}
      />
    </div>
  );
}

export default ChatComponent;
