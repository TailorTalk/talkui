import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import UploadService from "../../services/upload.service";
import { useAuth } from "../../contexts/AuthContext";
import ExpandableList from './ToolsList';

function ToolsModal() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [tools, setTools] = useState('');
    const { userInfo } = useAuth();

    // Fetch the system message when the modal opens
    useEffect(() => {
        if (isModalOpen) {
            UploadService.listTools(userInfo)
                .then(response => {
                    console.log("akash", "Tools response:", response.data.result);
                    setTools(response.data.result); // Assuming the response contains { message: 'your system message' }
                })
                .catch(error => {
                    console.error("Error fetching system message:", error);
                });
        }
    }, [isModalOpen]);

    const handleToolChange = (tool) => {
        UploadService.setTool(userInfo, tool)
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
                Tools
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
                <DialogTitle>Configure tools</DialogTitle>
                <DialogContent sx={{ flexGrow: 1 }}>
                    {tools && <ExpandableList data={tools} handleToolChange={handleToolChange}/>}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ToolsModal;
