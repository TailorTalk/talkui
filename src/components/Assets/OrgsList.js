import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Modal, IconButton, TextField, Button, ListSubheader, ListItemIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from "../../contexts/AuthContext";
import assetsService from "../../services/assets.service";
import orgsService from '../../services/orgs.service';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import TextOverlay from '../Overlay/TextOverlay';
import LoadingOverlay from '../Overlay/LoadingOverlay';
import GroupsIcon from '@mui/icons-material/Groups';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Create, Info } from '@mui/icons-material';
import CreateOrgModal from './OrgModals/CreateOrg';
import CreateCollaboratorModal from './OrgModals/Collaborate';
import OrgInfoModal from './OrgModals/Info';

function OrgsList({ onSelect }) {
    const [orgs, setOrgs] = useState([]);
    const [open, setOpen] = useState(false);
    const [collaboratorOrg, setCollaboratorOrg] = useState(""); // TODO: Change this to false when done testing
    const [viewOrg, setViewOrg] = useState(null); // TODO: Change this to false when done testing
    const [botName, setBotName] = useState("");
    const [botDescription, setBotDescription] = useState("");
    const [failed, setFailed] = useState(false);
    const [failMessage, setFailMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const { userInfo } = useAuth();

    const handleCollaborateClick = (event, orgName) => {
        event.stopPropagation();
        console.log("Collaborate clicked for org: ", orgName);
        setCollaboratorOrg(orgName);
        setOpen(true);
    }

    const handleInfoClick = (event, org) => {
        event.stopPropagation();
        console.log("Info clicked for org: ", org);
        setViewOrg(org);
        setOpen(true);
    }

    const addCollaborator = (orgName, collaboratorId) => {
        console.log("Adding collaborator: ", orgName, collaboratorId) //addCollaborator(orgName, collaboratorId)
        setLoading(true);
        orgsService.addCollaborator(orgName, collaboratorId)
            .then((response) => {
                console.log("Response of create org: ", response.data);
                return response.data
            })
            .then(data => {
                if (!data.success) {
                    setFailMessage("Could not add collaborator. Backend returned success false");
                    setFailed(true);
                }
                setLoading(false);
            })
            .catch(() => {
                console.log("Could not add collaborator");
                setLoading(false);
                setFailMessage("Could not add collaborator");
                setFailed(true);
            });
    }

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
                        {org.is_admin && <ListItemIcon>
                            <GroupsIcon onClick={(event) => handleCollaborateClick(event, org.name)} />
                        </ListItemIcon>}
                        <InfoOutlinedIcon onClick={(event) => handleInfoClick(event, org)}/>
                    </ListItem>
                ))}
            </List>
            {failed && <TextOverlay message={failMessage} />}
            {loading && <LoadingOverlay message="Loading..." />}
            <IconButton onClick={() => setOpen(true)}>
                <AddIcon />
            </IconButton>
            {!collaboratorOrg ? <CreateOrgModal
                open={open}
                setOpen={setOpen}
                createOrg={createOrg} /> : <CreateCollaboratorModal
                open={open}
                setOpen={setOpen}
                orgName={collaboratorOrg}
                addCollaborator={addCollaborator} />}
            {viewOrg && <OrgInfoModal org={viewOrg} open={open} setOpen={setOpen} />}
        </div>
    );
}

export default OrgsList;