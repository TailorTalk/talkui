import React, { useState } from 'react';
import { Box, TextField, Chip } from '@mui/material';

function Suggestions({ asset, handleInputChange, isEditing }) {
    // console.log("Asset in default asset: ", asset)
    // console.log("Is editing in default asset: ", isEditing)
    const [inputValue, setInputValue] = useState('');

    const handleTextInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            const updatedSuggestions = asset.suggested_questions ? [...asset.suggested_questions, inputValue] : [inputValue];
            handleInputChange(updatedSuggestions, 'suggested_questions');
            setInputValue('');
        }
    };

    const handleDelete = (toDelete) => {
        const updatedSuggestions = asset.suggested_questions.filter(
          (suggestion) => suggestion !== toDelete
        );
        handleInputChange(updatedSuggestions, 'suggested_questions');
      };

    return (
        <Box display="flex" flexDirection="column" gap={2} position="relative">
            {/* Text field for user input */}
            <TextField
                label="Add your suggestion"
                variant="outlined"
                fullWidth
                value={inputValue}
                onChange={handleTextInputChange}
                onKeyPress={handleKeyPress}
                disabled={!isEditing}
            />
            {/* Display suggestions as chips */}
            {asset.suggested_questions && <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {asset.suggested_questions.map((suggestion, index) => (
                    <Chip 
                        key={index} 
                        label={suggestion}
                        variant="outlined"
                        onDelete={() => handleDelete(suggestion)}
                        classes={{ deleteIcon: 'deleteIcon' }}
                        disabled={!isEditing} />
                ))}
            </div>}
        </Box>
    );
}

export default Suggestions;
