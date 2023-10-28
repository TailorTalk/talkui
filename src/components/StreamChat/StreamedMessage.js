import React, { useEffect, useRef, useState } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MemoryIcon from '@mui/icons-material/Memory';

import { createChatConnection } from "../../services/streamChat.service";
import { useAuth } from "../../contexts/AuthContext";
import { useQueryString } from '../../contexts/QueryStringContext';
import resolveStreamMessages from "./resolveStreamMessages";

const StreamMessageItem = React.memo(({ sessionId, message, onDone }) => {
    console.log("akash", "I am re rendered", sessionId, message)
    const [msg, setMsg] = useState(null);
    const { userInfo } = useAuth();
    const { queryDict, updateQueryKey, deleteQueryKey } = useQueryString();
    const currentMessageRef = useRef([]);
    console.log("Query dict values in streaming", queryDict)

    useEffect(() => {
        // Assuming you have a function called 'createMessageStream' that sets up the event stream
        if (!userInfo) {
            console.log("akash", "No user info found. I will skip the SSE connection");
            return;
        }
        console.log("akash", "I am creating SSE connection for the user", userInfo);
        const eventSource = createChatConnection(userInfo, sessionId, message, queryDict.orgId, queryDict.botId);

        eventSource.onmessage = (event) => {
            const newMessage = event.data;
            const obj = JSON.parse(newMessage);
            console.log("akash", "I received new message", obj);
            currentMessageRef.current = [...currentMessageRef.current, obj];
            const temp_msg = resolveStreamMessages(currentMessageRef.current);
            console.log("akash", "I am temp_msg", temp_msg)
            setMsg(temp_msg.msg);
        };

        eventSource.onclose = () => {
            console.log("akash", "Stream closed");
            if (onDone) {
                const temp_msg = resolveStreamMessages(currentMessageRef.current);
                console.log("akash", "I am temp_msg", temp_msg)
                onDone(temp_msg.msg, temp_msg.sessionId? temp_msg.sessionId: sessionId);
            }
            eventSource.close();
        };

        eventSource.onerror = (error) => {
            console.error("EventSource failed:", error);
            if (onDone) {
                const temp_msg = resolveStreamMessages(currentMessageRef.current);
                console.log("akash", "I am temp_msg", temp_msg)
                onDone(temp_msg.msg, temp_msg.sessionId? temp_msg.sessionId: sessionId);
            }
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [onDone, userInfo, sessionId, message]);

    if (!msg) return null;  // Return null if msg hasn't been received yet

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {msg.role === "user" ? <PersonIcon /> : <MemoryIcon />}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={msg.content} />
        </ListItem>
    );
});

export default StreamMessageItem;
