
import React, { useState, useEffect, useCallback } from "react";
import { Typography } from '@material-ui/core';

import ChatService from "../services/chat.service";
import { useAuth } from "../contexts/AuthContext";
import "./Files.css";
import SessionList from "../components/SessionList";
import ChatComponent from "../components/Chat";
import StreamChatComponent from "../components/StreamChat";


const Chat = () => {
    const [sessionList, setSessionList] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sessionId, setSessionId] = useState("");
    const [onGoingAPI, setOnGoingAPI] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const { userInfo } = useAuth();

    const listSessions = useCallback(() => {
        ChatService.listSessions(userInfo).then(response => {
            setSessionList(response.data);
        })
            .catch(() => {
                setMessage("Could not list sessions");
                setIsError(true);
            });
    }, [userInfo]);

    useEffect(() => {
        listSessions();
    }, [listSessions]);

    const deleteSession = (session) => {
        ChatService.deleteSession(userInfo, session.session_id)
            .then((response) => {
                console.log("Response of delete: ", response.data);
                return ChatService.listSessions(userInfo);
            })
            .then((sessions) => {
                setSessionList(sessions.data)
            })
            .catch(() => {
                setMessage("Could not delete the session!");
                setIsError(true);
            })
    }

    const onMessageSend = (message, thisSessionid) => {
        console.log("akash", "onMessageSend", message, thisSessionid);
        setOnGoingAPI(true);
        ChatService.chat(userInfo, thisSessionid, message)
            .then((response) => {
                setSessionId(response.data.result.session_id);
                onSessionSelect({ session_id: response.data.result.session_id })
                if (thisSessionid === "") {
                    listSessions();
                }
                setOnGoingAPI(false);
            })
            .catch(() => {
                setMessage("Could not execute chat!");
                setIsError(true);
                setOnGoingAPI(false);
            })
    }

    const onSessionSelect = (session) => {
        ChatService.getSession(userInfo, session.session_id)
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
                <ChatComponent
                    pastChatHistory={currentChat}
                    onMessageSend={onMessageSend}
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


