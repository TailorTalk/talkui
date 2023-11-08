import React, { useState } from 'react';
import { Modal, Button, Typography, Box, Chip, List, ListItem } from '@mui/material';
import { styled } from '@mui/system';
import {unixToFormattedDate} from '../../../utils/utils';

const OrgInfoModalContent = styled(Box)({
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

function OrgInfoModal({ open, setOpen, org }) {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <OrgInfoModalContent style={{ padding: '10px' }}>
                <Typography variant="h6" component="h2" style={{ paddingBottom: '5px' }}>
                    Org details
                </Typography>
                <List>
                    <ListItem>
                        <Typography variant="subtitle1">Name: </Typography>
                        <Typography variant="body1">{org.name}</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1">Created by: </Typography>
                        <Typography variant="body1">{org.created_by}</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1">Created on: </Typography>
                        <Typography variant="body1">{unixToFormattedDate(org.created_on)}</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1">Status: </Typography>
                        <Typography variant="body1">{org.status}</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1">Admins: </Typography>
                        {org.admins.map((admin, index) => (
                            <Chip key={index} label={admin} style={{ marginRight: '5px' }} />
                        ))}
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1">Editors: </Typography>
                        {org.editors.map((editor, index) => (
                            <Chip key={index} label={editor} style={{ marginRight: '5px' }} />
                        ))}
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1">Viewers: </Typography>
                        {org.viewers.length > 0 ? (
                            org.viewers.map((viewer, index) => (
                                <Chip key={index} label={viewer} style={{ marginRight: '5px' }} />
                            ))
                        ) : (
                            <Typography variant="body2">No viewers</Typography>
                        )}
                    </ListItem>
                </List>
                <Button onClick={() => {
                    setOpen(false);
                }}>
                    Done
                </Button>
            </OrgInfoModalContent>
        </Modal>
    );
}

export default OrgInfoModal;