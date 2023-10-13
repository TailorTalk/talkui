import React, { useState, useRef, useEffect } from 'react';
import { TextField, List, ListItem, Paper, CircularProgress, LinearProgress } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MemoryIcon from '@mui/icons-material/Memory';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useAuth } from "../../contexts/AuthContext";
import { createChatConnection } from "../../services/streamChat.service";
import StreamMessageItem from './StreamedMessage';

const MessageItem = React.memo(({ msg }) => {
    console.log("akash", "MessageItem", msg);
    return (
        <ListItem
        >
            <ListItemAvatar>
                <Avatar>
                    {msg.role === "user" ? <PersonIcon /> : <MemoryIcon />}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={msg.content}
            />
        </ListItem>
    );
});

function StreamChatComponent({ pastChatHistory, onMessageSend, sessionId, ongoing }) {
    const [inputMessage, setInputMessage] = useState('');
    const [finalInputMessage, setFinalInputMessage] = useState('');
    const [chatHistory, setChatHistory] = useState(pastChatHistory);
    const [startStream, setStartStream] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        console.log("akash", "I received new history", pastChatHistory)
        setChatHistory(pastChatHistory);
        scrollToBottom()
    }, [pastChatHistory]);

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
        setFinalInputMessage(event.target.value);
    };

    const onStreamDone = (streamedMessage) => {
        console.log("akash", "onStreamDone", streamedMessage);
        setStartStream(false);
        const chatHistoryCopy = {...chatHistory};
        chatHistoryCopy.result.history.push(streamedMessage);
        setChatHistory(chatHistoryCopy);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && inputMessage.trim()) {
            if (chatHistory) {
                const chatHistoryCopy = {...chatHistory};
                chatHistoryCopy.result.history.push({role: "user", content: inputMessage});
                setChatHistory(chatHistoryCopy);
            } else {
                setChatHistory({success: true, result: {history: [{role: "user", content: inputMessage}]}})
            }
            setInputMessage(''); 
            setStartStream(true);
            //onMessageSend(inputMessage, sessionId);// Clear the input box
        }
    };
    return (
        <Paper elevation={3} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {chatHistory
                && chatHistory.success ? <List style={{ overflowY: 'auto', flexGrow: 1, padding: '1rem' }}>
                {chatHistory.result.history.map((msg, index) => (
                    <MessageItem msg={msg} />
                ))}
                {startStream && <StreamMessageItem 
                message = {finalInputMessage}
                sessionId = {sessionId} 
                onDone = {onStreamDone} />}
                <div ref={chatEndRef}></div>
            </List> : <div ref={chatEndRef} style={{ overflowY: 'auto', flexGrow: 1, padding: '1rem' }}></div>}
            {ongoing && <LinearProgress sx={{ height: '20px' }} />}
            <TextField
                variant="outlined"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                fullWidth
                style={{ margin: '0.5rem' }}
            />
        </Paper>
    );
}

export default StreamChatComponent;
