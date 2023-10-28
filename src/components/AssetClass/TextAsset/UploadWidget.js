import React, { useState } from 'react';
import { Button, LinearProgress, Typography, IconButton, Box } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useAuth } from "../../../contexts/AuthContext";
import assetsService from '../../../services/assets.service';

function FileUpload({assetFileDetails, orgId, bot, handleInputChange}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const { userInfo } = useAuth();
  console.log("Upload progress: ", uploadProgress)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    setUploadProgress(0);

    assetsService.upload(userInfo, orgId, bot.org_chat_bot_id, selectedFile, (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setUploadProgress(progress);
    })
    .then(response => {
        console.log("Result of upload asset", response.data);
        return response.data
    })
    .then(data => {
        setUploadResult(data)
        handleInputChange(data.result.upload_details, "file_details")
    })
    .catch(error => {
        console.log("Error uploading asset", error);
        setUploadResult({ error: 'Upload failed!' });
    })
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} position="relative" alignItems="center"
        style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
    {assetFileDetails? <Typography>Previous file: {assetFileDetails.original_file_name}</Typography>: <Typography>No file uploaded</Typography>}
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="*" // Adjust this if you want to limit file types
        id="upload-button"
      />
      <label htmlFor="upload-button">
      <Button variant="outlined" component="span" style={{width: '100px'}} >
    <CloudUpload />
  </Button>
      </label>
      {selectedFile && <Typography>{selectedFile.name}</Typography>}
      {selectedFile && (
        <Button onClick={handleUpload} disabled={uploadProgress > 0 && uploadProgress < 100}>
          Upload
        </Button>
      )}
      {uploadProgress > 0 && 
      <>
      <LinearProgress 
        variant="determinate" 
        value={uploadProgress} 
        style={{width: '100%'}}/>
        <Typography>{uploadProgress}%</Typography>
    </>}
    </Box>
  );
}

export default FileUpload;
