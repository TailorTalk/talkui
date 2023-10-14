import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import UploadService from "../../services/upload.service";
import { useAuth } from "../../contexts/AuthContext";

function SystemMessageModal() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { userInfo } = useAuth();

    // Fetch the system message when the modal opens
    useEffect(() => {
        if (isModalOpen) {
            UploadService.getSystemMessage(userInfo)
                .then(response => {
                    setMessage(response.data.result); // Assuming the response contains { message: 'your system message' }
                })
                .catch(error => {
                    console.error("Error fetching system message:", error);
                });
        }
    }, [isModalOpen, userInfo]);

    const handleSubmit = () => {
        UploadService.setSystemMessage(userInfo, message)
            .then(() => {
                alert('Message updated successfully!');
                setModalOpen(false);
            })
            .catch(error => {
                console.error("Error updating system message:", error);
            });
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
                System Message
            </Button>

            <Dialog
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                maxWidth="md"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        width: '50vw',  // 50% of viewport width
                        height: '50vh', // 50% of viewport height
                    },
                }}>
                <DialogTitle>System Message</DialogTitle>
                <DialogContent sx={{ flexGrow: 1 }}>
                    <DialogContentText>
                        Edit the system message below
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="message"
                        label="System Message"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        multiline
                        sx={{ flexGrow: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SystemMessageModal;
