import React, { useState, useEffect } from "react";
import assetsService from "../../services/assets.service";
import { Chip, Typography } from "@mui/material";

function ChatSuggestions({ userInfo, orgId, botId, onSuggestionClick }) {
  // console.log("Details in chat suggestions: ", userInfo, orgId, botId)
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (!orgId || !botId) {
      return;
    }
    assetsService
      .getSuggestions(userInfo, orgId, botId)
      .then((response) => {
        // console.log("Response of suggestions: ", response.data);
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          setSuggestions(data.result);
          setMessage("");
          setIsError(false);
        } else {
          setMessage(
            "Could not get suggestions. Backend returned success as False!"
          );
          setIsError(true);
        }
      })
      .catch(() => {
        setMessage("Could not get suggestions!");
        setIsError(true);
      });
  }, [userInfo, orgId, botId]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        padding:"10px"
      }}
    >
      {suggestions.map((suggestion, index) => (
        <Chip
          key={index}
          label={suggestion}
          variant="outlined"
          onClick={() => onSuggestionClick(suggestion)}
          sx={{ fontSize: "14px", color: "#717171" }}
        />
      ))}
      {message && (
        <Typography variant="subtitle1" color={isError ? "error" : "inherit"}>
          {message}
        </Typography>
      )}
    </div>
  );
}

export default ChatSuggestions;
