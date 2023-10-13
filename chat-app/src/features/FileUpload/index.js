import React, { useState } from 'react';
import Button from '../../components/Button';
import FileList from '../../components/FileList';
import { uploadFiles } from '../../services/api';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onFilesChange = (event) => {
    setFiles([...event.target.files]);
  };

  const onUpload = async () => {
    try {
      setUploading(true);
      await uploadFiles(files);
      alert('Files uploaded successfully!');
    } catch (error) {
      alert('Error uploading files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={onFilesChange} />
      <Button onClick={onUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
      <FileList files={files} />
    </div>
  );
};

export default FileUpload;
