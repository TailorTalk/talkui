import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function getStringFromUnix(unixTimestamp) {
    // Convert the Unix timestamp to milliseconds
    const date = new Date(unixTimestamp * 1000);

    // Format the date
    const formattedDate = date.toLocaleDateString('en-US');  // Outputs: MM/DD/YYYY for en-US locale
    const formattedTime = date.toLocaleTimeString('en-US');  // Outputs time

    return formattedDate + " " + formattedTime;
}


const SessionList = ({ sessionList, onDelete, onSessionClick }) => {
    // console.log("akash", "session list", sessionList);
    let sortedSessions = [];
    if (sessionList && sessionList.success) {
        sortedSessions = sessionList.result.sort(
            (a, b) => b.time_created - a.time_created);
    } 
    return (<>
        {sessionList && sessionList.success ?
            sortedSessions.map((session, index) => {
                // console.log("akash", session, index);
                return (<ListItem
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                    onClick={() => {
                        // console.log("ListItem clicked for session:", session);
                        onSessionClick(session);
                    }}
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={(e) => {
                                e.stopPropagation(); // This will prevent the ListItem's onClick from being triggered when the IconButton is clicked
                                // console.log("Delete icon clicked!");
                                onDelete(session); // Handle delete logic here
                            }}>
                            <DeleteIcon />
                        </IconButton>
                    }
                    divider
                    key={index}>
                    <ListItemAvatar>
                        <Avatar>
                            <ChatIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={session.name}
                        secondary={getStringFromUnix(session.time_created)}
                    />
                </ListItem>)
            }) : <div></div>}
    </>)
};

export default SessionList;
