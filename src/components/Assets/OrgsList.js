import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Modal, IconButton, TextField, Button, ListSubheader } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from "../../contexts/AuthContext";
import assetsService from "../../services/assets.service";
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

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


function OrgsList({ onSelect }) {
    const [orgs, setOrgs] = useState([]);
    const [open, setOpen] = useState(false);
    const [orgName, setOrgName] = useState("");
    const [botName, setBotName] = useState("");
    const [botDescription, setBotDescription] = useState("");
    const { userInfo } = useAuth();

    const createBot = (orgId, botName, botDescription) => {
        console.log("Creating bot for org: ", orgId, botName, botDescription)
        assetsService.createBot(userInfo, orgId, botName, botDescription)
            .then((response) => {
                console.log("Response of create bot: ", response.data);
                return assetsService.listOrgs(userInfo);
            })
            .then(
                response => {
                    console.log("Result of list org", response.data);
                    return response.data
                }
            )
            .then(data => {
                setOrgs(data.result.orgs)
            })
            .catch(() => {
                console.log("Could not create bot");
            });
    }

    useEffect(() => {
        // fetch orgs using /list_orgs
        assetsService.listOrgs(userInfo)
            .then(
                response => {
                    console.log("Result of list org", response.data);
                    return response.data
                }
            )
            .then(data => {
                setOrgs(data.result.orgs)
            })
            .catch(() => {
                console.log("Could not list orgs");
            });
    }, [userInfo]);

    return (
        <div>
            <List>
            <ListSubheader>Organisations</ListSubheader>
                {orgs.map(org => (
                    <ListItem button key={org} onClick={() => onSelect(org)}>
                        <ListItemText primary={org} />
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
                <ModalContent style={{padding: '10px'}}>
                    <Typography variant="h6" component="h2" style={{paddingBottom: '5px'}}>
                        New Org
                    </Typography>
                    <TextField 
                        label="Org Name" 
                        style={{paddingBottom: '5px'}}
                        onChange={event=>setOrgName(event.target.value)}/>
                    <TextField 
                        label="Bot name" 
                        style={{paddingBottom: '5px'}}
                        onChange={event=>setBotName(event.target.value)}/>
                    <TextField 
                        label="Bot description" 
                        style={{paddingBottom: '5px'}}
                        onChange={event=>setBotDescription(event.target.value)}/>
                    {/* Add any other input fields */}
                    <Button onClick={() => {
                        // Logic to create a new org
                        createBot(orgName, botName, botDescription);
                        setOpen(false);
                    }}>
                        Create
                    </Button>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default OrgsList;