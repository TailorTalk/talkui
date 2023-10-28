import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Modal, IconButton, TextField, Button, ListSubheader } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../../contexts/AuthContext";
import assetsService from '../../services/assets.service';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import {unixToFormattedDate} from '../../utils/utils';

const ModalContent = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,  // or whatever width you desire
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
});


function BotsList({ orgId, onSelect }) {
    const [bots, setBots] = useState([]);
    const [open, setOpen] = useState(false);
    const [botName, setBotName] = useState("");
    const [botDescription, setBotDescription] = useState("");
    const { userInfo } = useAuth();
    console.log("Selected org: ", orgId)

    useEffect(() => {
        console.log("Org id: ", orgId)
        // fetch bots for the given org using /list_bots
        if (orgId) {
            assetsService.listBots(userInfo, orgId)
                .then(response => {
                    console.log("Result of list bots", response.data);
                    return response.data
                })
                .then(data => setBots(data.result.bots));
        }
    }, [orgId]);

    const createBot = (botName, botDescription) => {
        console.log("Creating bot for org: ", orgId, botName, botDescription)
        assetsService.createBot(userInfo, orgId, botName, botDescription)
            .then((response) => {
                console.log("Response of create bot: ", response.data);
                return assetsService.listBots(userInfo, orgId);
            })
            .then(response => {
                console.log("Result of list bots", response.data);
                return response.data
            })
            .then(data => setBots(data.result.bots))
            .catch(() => {
                console.log("Could not create bot");
            });
    }

    const onDelete = (botId) => {
        console.log("Deleting bot: ", botId)
        assetsService.deleteBot(userInfo, orgId, botId)
            .then((response) => {
                console.log("Response of delete bot: ", response.data);
                return assetsService.listBots(userInfo, orgId);
            })
            .then((bots) => {
                console.log("Result of list bots", bots.data)
                setBots(bots.data.result.bots)
            })
            .catch(() => {
                console.log("Could not delete bot");
            })
    }

    return (
        <div>
            <List>
                <ListSubheader>Bots for {orgId}</ListSubheader>
                {bots.map(bot => (
                    <ListItem button key={bot.id} onClick={() => onSelect(bot)}>
                        <ListItemText primary={bot.bot_name} secondary={unixToFormattedDate(bot.created_at)} />
                        <IconButton aria-label="delete" onClick={() => onDelete(bot.org_chat_bot_id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <IconButton onClick={() => setOpen(true)}>
                <AddIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <ModalContent style={{ padding: '10px' }}>
                    <Typography variant="h6" component="h2" style={{ paddingBottom: '5px' }}>
                        New Bot for {orgId}
                    </Typography>
                    <TextField 
                        label="Bot name" 
                        style={{ paddingBottom: '5px' }} 
                        onChange={event=>setBotName(event.target.value)}/>
                    <TextField 
                        label="Bot description"
                        onChange={event=>setBotDescription(event.target.value)} />
                    {/* Add any other input fields */}
                    <Button onClick={() => {
                        // Logic to create a new org
                        createBot(botName, botDescription)
                        setOpen(false);
                    }}>
                        Create
                    </Button>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default BotsList;