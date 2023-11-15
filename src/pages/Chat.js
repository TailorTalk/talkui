
import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from '@material-ui/core';

import ChatService from "../services/chat.service";
import { useAuth } from "../contexts/AuthContext";
import "./Files.css";
import SessionList from "../components/SessionList";
import StreamChatComponent from "../components/StreamChat";
import { useQueryString } from '../contexts/QueryStringContext';
import LoadingOverlay from "../components/Overlay/LoadingOverlay";
import { useNotify } from '../contexts/NotifyContext';


const Chat = () => {
    const [sessionList, setSessionList] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sessionId, setSessionId] = useState("");
    const [onGoingAPI, setOnGoingAPI] = useState(false);
    const [loading, setLoading] = useState(true);

    let { userInfo } = useAuth();
    const { addMessage, addErrorMessage } = useNotify();
    const { queryDict } = useQueryString();
    if (userInfo && queryDict) {
        if (queryDict.email) {
            userInfo.email = queryDict.email;
        }
    }
    console.log("Query dict values in Chat", queryDict)

    useEffect(() => {
        setLoading(true);
        if (queryDict.botId) {
            ChatService.listSessions(userInfo, queryDict.orgId, queryDict.botId).then(response => {
                setSessionList(response.data);
                setLoading(false);
            })
            .catch(() => {
                addErrorMessage("Could not list sessions");
                setLoading(false);
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
                addErrorMessage("Could not delete the session!");
            })
    }

    const onStreamStart = () => {
        console.log("akash", "onStreamStart");
        setOnGoingAPI(true);
    }

    const onNewSession = () => {
        console.log("akash", "onNewSession");
        setSessionId("");
        setCurrentChat(null);
    }

    const onStreamDone = (thisSessionid) => {
        console.log("akash", "onStreamDone", thisSessionid);
        setOnGoingAPI(false);
        if (sessionId !== thisSessionid) {
            ChatService.listSessions(userInfo, queryDict.orgId, queryDict.botId).then(response => {
                setSessionList(response.data);
            })
            .catch(() => {
                addErrorMessage("Could not list sessions");
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
                addErrorMessage("Could not select session!");
            })
    }

    return (
        <div style={{display: 'flex', height: '100vh'}}>
            {loading && <LoadingOverlay message="Loading..." />}
            <Box style={{padding: '20px', flex: '0.2', backgroundColor: '#f5f5f5', maxHeight: '100vh', overflowY: 'auto'}}>
                {/* Left column content goes here */}
                <>
                {<Button variant='outlined' onClick={onNewSession}>New chat</Button>}
                <ul style={{padding: '0', margin: '0'}}>
                    <SessionList
                        sessionList={sessionList}
                        onDelete={deleteSession}
                        onSessionClick={onSessionSelect} />
                </ul>
                </>
            </Box>
            <Box style={{padding: '20px', flex: '0.8', backgroundColor: '#e5e5e5'}}>
                {/* Right column content goes here */}
                <StreamChatComponent
                    pastChatHistory={currentChat}
                    onStart={onStreamStart}
                    onDone={onStreamDone}
                    sessionId={sessionId}
                    ongoing={onGoingAPI}
                    userInfo={userInfo}
                    orgId={queryDict.orgId}
                    botId={queryDict.botId} />
            </Box>
        </div>
    )

    return (
        <div style={{display: 'flex', height: '100vh'}}>
            {loading && <LoadingOverlay message="Loading..." />}
            <div style={{padding: '20px', flex: '0.2', backgroundColor: '#f5f5f5'}}>
                {/* Left column content goes here */}
                <Typography variant="h6" style={{marginTop: '10px'}}>
                    SessionList
                </Typography>
                <ul style={{padding: '0', margin: '0'}}>
                    <SessionList
                        sessionList={sessionList}
                        onDelete={deleteSession}
                        onSessionClick={onSessionSelect} />
                </ul>
            </div>
            <div style={{padding: '20px', flex: '0.8', backgroundColor: '#e5e5e5'}}>
                {/* Right column content goes here */}
                {/* Simple replace the ChatComponent with StreamChatComponent to use Stream Chat API */}
                {/*<ChatComponent
                    pastChatHistory={currentChat}
                    onMessageSend={onMessageSend}
                    sessionId={sessionId}
                    ongoing={onGoingAPI} />
                */}
                <Typography variant="h6" style={{marginTop: '10px'}}>{`Org: ${queryDict.orgId} Bot: ${queryDict.botName}`}</Typography>
                <StreamChatComponent
                    pastChatHistory={currentChat}
                    onStart={onStreamStart}
                    onDone={onStreamDone}
                    sessionId={sessionId}
                    ongoing={onGoingAPI}
                    userInfo={userInfo}
                    orgId={queryDict.orgId}
                    botId={queryDict.botId} />
            </div>
        </div>
    );
}

export default Chat;


