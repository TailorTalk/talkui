import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  List,
  ListItem,
  LinearProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MemoryIcon from "@mui/icons-material/Memory";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import StreamMessageItem from "./StreamedMessage";
import ChatSuggestions from "../ChatSuggestions";
import { Send } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const MessageItem = React.memo(({ msg }) => {
  // console.log("akash", "MessageItem", msg);

  const { userInfo } = useAuth();

  return (
    <ListItem>
      <div
        className={`w-full flex items-center   ${
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
              : "bg-white border-[#cfcfcf9d] text-[#323131] "
          } `}
        />
      </div>
    </ListItem>
  );
});

function StreamChatComponent({
  pastChatHistory,
  onStart,
  onDone,
  sessionId,
  userInfo,
  orgId,
  botId,
}) {
  const [inputMessage, setInputMessage] = useState("");
  const [finalInputMessage, setFinalInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(pastChatHistory);
  const [startStream, setStartStream] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // console.log("akash", "I received new history", pastChatHistory)
    setChatHistory(pastChatHistory);
    scrollToBottom();
  }, [pastChatHistory]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
    setFinalInputMessage(event.target.value);
  };

  const onStreamDone = (streamedMessage, sessionId) => {
    // console.log("akash", "onStreamDone", streamedMessage, sessionId);
    setStartStream(false);
 
    onDone(sessionId);
  };

  const handleKeyPress = (event) => {
    // console.log(event);
    if (
      (event.key === "Enter" && inputMessage.trim()) ||
      (event.type === "click" && inputMessage.trim())
    ) {
      
      onStart();
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
      setInputMessage("");
      
      setStartStream(true);
      //onMessageSend(inputMessage, sessionId);// Clear the input box
    }
  };

  const onSuggestionClick = (suggestion) => {
    // console.log("akash", "onSuggestionClick", suggestion);
    
    setFinalInputMessage(suggestion);
    onStart();
    if (chatHistory) {
      const chatHistoryCopy = { ...chatHistory };
      chatHistoryCopy.result.history.push({
        role: "user",
        content: suggestion,
      });
      setChatHistory(chatHistoryCopy);
    } else {
      setChatHistory({
        success: true,
        result: { history: [{ role: "user", content: suggestion }] },
      });
    }
    setInputMessage("");
    
    setStartStream(true);
  };
  return (
    <div className="flex flex-col bg-gray-50   justify-between h-full">
      {chatHistory && chatHistory.success ? (
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
          {chatHistory.result.history.map((msg, index) => (
            <MessageItem msg={msg} key={index} />
          ))}

          
          {startStream && (
            <StreamMessageItem
              message={finalInputMessage}
              sessionId={sessionId}
              onDone={onStreamDone}
            />
          )}
          <div ref={chatEndRef}></div>
        </List>
      ) : (
        <div
          ref={chatEndRef}
          style={{
            overflowY: "scroll",
            flexGrow: 1,
            padding: "1rem",
            height: "100%",
          }}
        ></div>
      )}
      <div>
        <ChatSuggestions
          userInfo={userInfo}
          orgId={orgId}
          botId={botId}
          onSuggestionClick={onSuggestionClick}
        />
        {startStream && <LinearProgress sx={{ height: "4px" }} />}
        <TextField
          variant="outlined"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          fullWidth
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
    </div>
  );
}

export default StreamChatComponent;
