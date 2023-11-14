import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNotify } from '../../../contexts/NotifyContext';

function JsonInputComponent({ hintJson, handleInputChange, field_name, asset }) {
    const [jsonInput, setJsonInput] = useState(JSON.stringify(hintJson, null, 2));
    const [isEditable, setIsEditable] = useState(true);
    const { addErrorMessage } = useNotify();

    useEffect(() => {
        if (field_name && asset[field_name]) {
            setJsonInput(JSON.stringify(asset[field_name], null, 2));
        }
    }, [asset, field_name])

    const handleJsonChange = (event) => {
        setJsonInput(event.target.value);
    };

    const handleSubmit = () => {
        try {
            // Parse JSON to ensure valid JSON is submitted
            const parsedJson = JSON.parse(jsonInput);
            handleInputChange(parsedJson, field_name);
            setIsEditable(false);
        } catch (error) {
            addErrorMessage("Invalid JSON. Please correct it and try again.");
        }
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto' }}>
            <TextField
                label="JSON Input"
                multiline
                rows={13}
                value={jsonInput}
                onChange={handleJsonChange}
                variant="outlined"
                fullWidth
                disabled={!isEditable}
                helperText={isEditable ? "Enter your JSON here" : ""}
            />
            {isEditable ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ marginTop: 2 }}
                >
                    Submit
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleEdit}
                    sx={{ marginTop: 2 }}
                >
                    Edit
                </Button>
            )}
        </Box>
    );
}

export default JsonInputComponent;
