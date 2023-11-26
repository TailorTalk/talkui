import React, { useState } from 'react';
import { Box, TextField, Chip, Card, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



function MultilineTextWithCloseButton({ text, onClose, textSize, disabled }) {
    const textLines = text.split('\n').map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ));
  
    return (
      <Card variant="outlined" sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ flexGrow: 1, wordBreak: 'break-word', fontSize: textSize }}>
          {textLines}
        </Typography>
        {!disabled && <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>}
      </Card>
    );
  }

function Templates({ asset, handleInputChange, isEditing }) {
    // console.log("Asset in default asset: ", asset)
    // console.log("Is editing in default asset: ", isEditing)
    const [inputValue, setInputValue] = useState('');

    const handleTextInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            const updatedSuggestions = asset.messages ? [...asset.messages, inputValue] : [inputValue];
            handleInputChange(updatedSuggestions, 'messages');
            setInputValue('');
        }
    };

    const handleDelete = (toDelete) => {
        const updatedSuggestions = asset.messages.filter(
            (suggestion) => suggestion !== toDelete
        );
        handleInputChange(updatedSuggestions, 'messages');
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            {/* Text field for user input */}
            { !!isEditing && <TextField
                label="Add messages for this template"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={inputValue}
                onChange={handleTextInputChange}
                onKeyPress={handleKeyPress}
                disabled={!isEditing}
            /> }
            {/* Display suggestions as chips */}
            {asset && asset.messages && <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {asset.messages.map((message, index) => (
                    <MultilineTextWithCloseButton
                        key={index}
                        text={message}
                        textSize={10}
                        variant="outlined"
                        onClose={() => handleDelete(message)}
                        classes={{ deleteIcon: 'deleteIcon' }}
                        disabled={!isEditing} />
                ))}
            </div>}
        </Box>
    );
}

export default Templates;
