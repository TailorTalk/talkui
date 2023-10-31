
import React, { useState, useEffect, useCallback } from "react";
import { Typography } from '@material-ui/core';

import ChatService from "../services/chat.service";
import { useAuth } from "../contexts/AuthContext";
import "./Files.css";
import SessionList from "../components/SessionList";
// import ChatComponent from "../components/Chat";
import StreamChatComponent from "../components/StreamChat";
import { useQueryString } from '../contexts/QueryStringContext';


const Chat = () => {
    const [sessionList, setSessionList] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sessionId, setSessionId] = useState("");
    const [onGoingAPI, setOnGoingAPI] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    let { userInfo } = useAuth();
    const { queryDict } = useQueryString();
    if (userInfo && queryDict) {
        if (queryDict.email) {
            userInfo.email = queryDict.email;
        }
    }
    console.log("Query dict values in Chat", queryDict)

    useEffect(() => {
        if (queryDict.botId) {
            ChatService.listSessions(userInfo, queryDict.orgId, queryDict.botId).then(response => {
                setSessionList(response.data);
            })
            .catch(() => {
                setMessage("Could not list sessions");
                setIsError(true);
            });
        }
    }, [userInfo, queryDict]);

    const deleteSession = (session) => {
        ChatService.deleteSession(userInfo, session.session_id, queryDict.orgId, queryDict.botId)
            .then((response) => {
                console.log("Response of delete: ", response.data);
                return ChatService.listSessions(userInfo, queryDict.orgId, queryDict.botId);
            })
            .then((sessions) => {
                setSessionList(sessions.data)
            })
            .catch(() => {
                setMessage("Could not delete the session!");
                setIsError(true);
            })
    }

    const onStreamStart = () => {
        console.log("akash", "onStreamStart");
        setOnGoingAPI(true);
    }

    const onStreamDone = (thisSessionid) => {
        console.log("akash", "onStreamDone", message, thisSessionid);
        setOnGoingAPI(false);
        if (sessionId !== thisSessionid) {
            ChatService.listSessions(userInfo, queryDict.orgId, queryDict.botId).then(response => {
                setSessionList(response.data);
            })
            .catch(() => {
                setMessage("Could not list sessions");
                setIsError(true);
            });
        }
        onSessionSelect({ session_id: thisSessionid })
    }

    const onSessionSelect = (session) => {
        ChatService.getSession(userInfo, session.session_id, queryDict.orgId, queryDict.botId)
            .then((response) => {
                console.log("Response of get session: ", response.data);
                setCurrentChat(response.data)
                setSessionId(response.data.result.session_id);
            })
            .catch(() => {
                setMessage("Could not select session!");
                setIsError(true);
            })
    }

    return (
        <div className="two-column-container">
            <div className="column left-column">
                {/* Left column content goes here */}
                <Typography variant="h6" className="list-header">
                    SessionList
                </Typography>
                <ul className="list-group">
                    <SessionList
                        sessionList={sessionList}
                        onDelete={deleteSession}
                        onSessionClick={onSessionSelect} />
                </ul>
            </div>
            <div className="column right-column">
                {/* Right column content goes here */}
                {/* Simple replace the ChatComponent with StreamChatComponent to use Stream Chat API */}
                {/*<ChatComponent
                    pastChatHistory={currentChat}
                    onMessageSend={onMessageSend}
                    sessionId={sessionId}
                    ongoing={onGoingAPI} />
                */}
                <Typography variant="h6" className="list-header">{`Org: ${queryDict.orgId} Bot: ${queryDict.botName}`}</Typography>
                <StreamChatComponent
                    pastChatHistory={currentChat}
                    onStart={onStreamStart}
                    onDone={onStreamDone}
                    sessionId={sessionId}
                    ongoing={onGoingAPI} />
                <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                    {message}
                </Typography>
            </div>
        </div>
    );
}

export default Chat;


