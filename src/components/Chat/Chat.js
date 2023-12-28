import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Switch, IconButton } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import ChatService from "../../services/chat.service";
import { useAuth } from "../../contexts/AuthContext";
import "./Files.css";
import SessionList from "../SessionList";
import StreamChatComponent from "./StreamChatComponent";
import ChatComponent from "./ChatComponent";
import { useQueryString } from "../../contexts/QueryStringContext";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import { useNotify } from "../../contexts/NotifyContext";
import { ArrowForwardIos, Refresh } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const Chat = ({ hideSessions, isAnAgent, hide }) => {
  const [sessionList, setSessionList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [onGoingAPI, setOnGoingAPI] = useState(false);
  const [loading, setLoading] = useState(true);
  const [streamMode, setStreamMode] = useState(!isAnAgent);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let { userInfo } = useAuth();
  const { addMessage, addErrorMessage } = useNotify();
  const { queryDict } = useQueryString();
  if (userInfo && queryDict) {
    if (queryDict.email) {
      userInfo.email = queryDict.email;
    }
  }
  // console.log("Query dict values in Chat", queryDict)

  useEffect(() => {
    // console.log('akash', 'isAnAgent', isAnAgent)
    setStreamMode(!isAnAgent);
    setLoading(true);
    if (queryDict.botId && queryDict.orgId) {
      ChatService.listSessions(userInfo, queryDict.orgId, queryDict.botId)
        .then((response) => {
          setSessionList(response.data);
          setLoading(false);
        })
        .catch(() => {
          // addErrorMessage("Could not list sessions");
          enqueueSnackbar("Could not list sessions", {
            variant: "error",
          });
          setLoading(false);
        });
    }
  }, [userInfo, queryDict, isAnAgent]);

  const onStreamModeChange = (event) => {
    // addMessage("Stream mode changed to " + event.target.checked);
    enqueueSnackbar("Stream mode changed to " + event.target.checked, {
      variant: "info",
    });
    setStreamMode(event.target.checked);
  };

  const deleteSession = (session) => {
    // addMessage("Deleting session...");
    enqueueSnackbar("Deleting session...", {
      variant: "info",
    });
    ChatService.deleteSession(
      userInfo,
      session.session_id,
      queryDict.orgId,
      queryDict.botId
    )
      .then((response) => {
        // console.log("Response of delete: ", response.data);
        if (response.data.success) {
          // addMessage("Session deleted successfully");
          enqueueSnackbar("Session deleted successfully", {
            variant: "success",
          });
          return ChatService.listSessions(
            userInfo,
            queryDict.orgId,
            queryDict.botId
          );
        } else {
          throw new Error("Could not delete the session!");
        }
      })
      .then((sessions) => {
        setSessionList(sessions.data);
      })
      .catch(() => {
        // addErrorMessage("Could not delete the session!");
        enqueueSnackbar("Could not delete the session!", {
          variant: "error",
        });
      });
  };

  const onStreamStart = () => {
    // console.log("akash", "onStreamStart");
    setOnGoingAPI(true);
  };

  const onNewSession = () => {
    // console.log("akash", "onNewSession");
    setSessionId("");
    setCurrentChat(null);
    // addMessage("New session started");
    enqueueSnackbar("New session started", {
      variant: "info",
    });
  };

  const onStreamDone = (thisSessionid) => {
    // console.log("akash", "onStreamDone", thisSessionid);
    setOnGoingAPI(false);
    if (sessionId !== thisSessionid) {
      ChatService.listSessions(userInfo, queryDict.orgId, queryDict.botId)
        .then((response) => {
          setSessionList(response.data);
        })
        .catch(() => {
          // addErrorMessage("Could not list sessions");
          enqueueSnackbar("Could not list sessions", {
            variant: "error",
          });
        });
    }
    onSessionSelect({ session_id: thisSessionid });
  };

  const onMessageSend = (message, thisSessionid) => {
    // console.log("akash", "onMessageSend", message, thisSessionid);
    setOnGoingAPI(true);
    ChatService.chat(
      userInfo,
      thisSessionid,
      message,
      queryDict.orgId,
      queryDict.botId
    )
      .then((response) => {
        setSessionId(response.data.result.session_id);
        onSessionSelect({ session_id: response.data.result.session_id });
        if (thisSessionid === "") {
          ChatService.listSessions(userInfo, queryDict.orgId, queryDict.botId)
            .then((response) => {
              setSessionList(response.data);
            })
            .catch(() => {
              // addErrorMessage("Could not list sessions");
              enqueueSnackbar("Could not list sessions", {
                variant: "error",
              });
            });
        }
        setOnGoingAPI(false);
      })
      .catch(() => {
        // addErrorMessage("Could not execute chat!");
        enqueueSnackbar("Could not execute chat!", {
          variant: "error",
        });
        setOnGoingAPI(false);
      });
  };

  const onSessionSelect = (session) => {
    ChatService.getSession(
      userInfo,
      session.session_id,
      queryDict.orgId,
      queryDict.botId
    )
      .then((response) => {
        // console.log("Response of get session: ", response.data);
        setCurrentChat(response.data);
        if (response.data.success) {
          setSessionId(response.data.result.session_id);
          // addMessage(
          //   "Session selected successfully. Session_id: " +
          //     response.data.result.session_id
          // );
          enqueueSnackbar(
            "Session selected successfully. Session_id: " +
              response.data.result.session_id,
            {
              variant: "success",
            }
          );
        } else {
          throw new Error("Error in selecting session. Backend error!");
        }
      })
      .catch(() => {
        // addErrorMessage("Could not select session!");
        enqueueSnackbar("Could not select session!", {
          variant: "error",
        });
      });
  };

  return (
    <div className={`h-full`}>
      {/* {loading && <LoadingOverlay message="Loading..." />} */}
      {!hideSessions && (
        <div>
          {/* Left column content goes here */}
          <>
            <div className="h-full">
              <Button variant="outlined" onClick={onNewSession}>
                New chat
              </Button>
              <FormGroup style={{ marginLeft: "20px", marginTop: "10px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={streamMode}
                      onChange={onStreamModeChange}
                    />
                  }
                  label="Streaming"
                />
              </FormGroup>
            </div>
            {sessionList && (
              <ul style={{ padding: "0", margin: "0" }}>
                <SessionList
                  sessionList={sessionList}
                  onDelete={deleteSession}
                  onSessionClick={onSessionSelect}
                />
              </ul>
            )}
          </>
        </div>
      )}
      <div className={`flex flex-col h-full ${hide ? "hidden" : "block"} `}>
        {/* Right column content goes here */}
        {/* Simple replace the ChatComponent with StreamChatComponent to use Stream Chat API */}
        {hideSessions && (
          <div className="flex items-center justify-between py-2 px-4  border-[1px] border-gray-300  rounded-t-md relative">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={streamMode}
                    onChange={onStreamModeChange}
                    sx={{ color: "red" }}
                  />
                  //   <Checkbox
                  //     checked={streamMode}
                  //     onChange={onStreamModeChange}
                  //   />
                }
                label="Streaming"
              />
            </FormGroup>

            <Refresh
              color="primary"
              sx={{ fontSize: "28px", translate: `${hide ? "0" : "-114px"}`,cursor:"pointer" }}
              onClick={onNewSession}
            />
          </div>
        )}
        {streamMode ? (
          <StreamChatComponent
            pastChatHistory={currentChat}
            onStart={onStreamStart}
            onDone={onStreamDone}
            sessionId={sessionId}
            ongoing={onGoingAPI}
            userInfo={userInfo}
            orgId={queryDict.orgId}
            botId={queryDict.botId}
          />
        ) : (
          <ChatComponent
            pastChatHistory={currentChat}
            onMessageSend={onMessageSend}
            sessionId={sessionId}
            ongoing={onGoingAPI}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;