import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Modal, IconButton, TextField, Button, ListSubheader } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from "../../contexts/AuthContext";
import assetsService from "../../services/assets.service";
import orgsService from '../../services/orgs.service';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import TextOverlay from '../Overlay/TextOverlay';
import LoadingOverlay from '../Overlay/LoadingOverlay';

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
    const [failed, setFailed] = useState(false);
    const [failMessage, setFailMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const { userInfo } = useAuth();

    const createOrg = (orgId) => {
        console.log("Creating org: ", orgId)
        setLoading(true);
        orgsService.createOrg(orgId)
            .then((response) => {
                console.log("Response of create org: ", response.data);
                return orgsService.listOrgs();
            })
            .then(
                response => {
                    console.log("Result of list org", response.data);
                    return response.data
                }
            )
            .then(data => {
                setOrgs(data.result.orgs)
                setLoading(false);
            })
            .catch(() => {
                console.log("Could not create bot");
                setLoading(false);
                setFailMessage("Could not create bot");
                setFailed(true);
            });
    }

    useEffect(() => {
        // fetch orgs using /list_orgs
        setLoading(true);
        orgsService.listOrgs()
            .then(
                response => {
                    console.log("Result of list org", response.data);
                    return response.data
                }
            )
            .then(data => {
                console.log("Orgs: ", data.result.orgs)
                setOrgs(data.result.orgs)
                setLoading(false);
            })
            .catch(() => {
                console.log("Could not list orgs");
                setFailMessage("Could not list orgs. Backend error");
                setLoading(false);
                setFailed(true);
            });
    }, [userInfo]);

    return (
        <div>
            <List>
            <ListSubheader>Organisations</ListSubheader>
                {orgs.map(org => (
                    <ListItem button key={org.name} onClick={() => onSelect(org.name)}>
                        <ListItemText primary={org.name} />
                    </ListItem>
                ))}
            </List>
            {failed && <TextOverlay message={failMessage} />}
            {loading && <LoadingOverlay message="Loading..." />}
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
                    <Button onClick={() => {
                        // Logic to create a new org
                        createOrg(orgName, botName, botDescription);
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