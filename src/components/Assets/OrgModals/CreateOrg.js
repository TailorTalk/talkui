import React, {useState} from 'react';
import { Modal, TextField, Button, Typography, ModalContent, Box } from '@mui/material';
import { styled } from '@mui/system';

const CreateOrgModalContent = styled(Box)({
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

function CreateOrgModal({ open, setOpen, createOrg }) {
    const [orgName, setOrgName] = useState("");
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <CreateOrgModalContent style={{ padding: '10px' }}>
                <Typography variant="h6" component="h2" style={{ paddingBottom: '5px' }}>
                    New Org
                </Typography>
                <TextField
                    label="Org Name"
                    style={{ paddingBottom: '5px' }}
                    onChange={event => setOrgName(event.target.value)} />
                <Button onClick={() => {
                    // Logic to create a new org
                    createOrg(orgName);
                    setOpen(false);
                }}>
                    Create
                </Button>
            </CreateOrgModalContent>
        </Modal>
    );
}

export default CreateOrgModal;