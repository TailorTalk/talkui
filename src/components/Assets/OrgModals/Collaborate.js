import React, {useState} from 'react';
import { Modal, TextField, Button, Typography, ModalContent, Box } from '@mui/material';
import { styled } from '@mui/system';

const CollaborateModalContent = styled(Box)({
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

function CreateCollaboratorModal({ open, setOpen, addCollaborator, orgName }) {
    const [collaboratorId, setCollaboratorId] = useState("");
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <CollaborateModalContent style={{ padding: '10px' }}>
                <Typography variant="h6" component="h2" style={{ paddingBottom: '5px' }}>
                    Collaborate
                </Typography>
                <TextField
                    label="Collaborator ID (usually it is Email ID)"
                    style={{ paddingBottom: '5px' }}
                    onChange={event => setCollaboratorId(event.target.value)} />
                <Button onClick={() => {
                    // Logic to create a new org
                    addCollaborator(orgName, collaboratorId);
                    setOpen(false);
                }}>
                    Add
                </Button>
            </CollaborateModalContent>
        </Modal>
    );
}

export default CreateCollaboratorModal;