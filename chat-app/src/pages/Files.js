import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, withStyles } from '@material-ui/core';

import UploadService from "../services/upload.service";
import { useAuth } from "../contexts/AuthContext";
import "./Files.css";
import FileList from "../components/FileList";
import MyDropzoneComponent from "../components/Dropzone";
import DatagenComponent from "../components/Datagen";
import SystemMessageModal from "../components/SystemMessage";
import ToolsModal from "../components/Tools";


const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: "#EEEEEE",
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

const UploadFiles = () => {
    const [selectedFiles, setSelectedFiles] = useState();
    const [currentFile, setCurrentFile] = useState();
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [fileInfos, setFileInfos] = useState([]);
    const [datagenStatus, setDatagenStatus] = useState(false);
    const [datagenDone, setDatagenDone] = useState(false)

    const { userInfo } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        UploadService.getFiles(userInfo).then(response => {
            setFileInfos(response.data);
        });
    }, [userInfo]);

    const getDatagenReadiness = () => {
        if (fileInfos && fileInfos.success && fileInfos.result.files.length > 0) {
            return true
        } else {
            return false
        }
    }

    const onFilesDropped = (files) => {
        console.log("akash", "fileInfos", selectedFiles)
        if (selectedFiles) {
            setSelectedFiles(selectedFiles.concat(files))
        } else {
            setSelectedFiles(files)
        }
    }

    const onFileDeleted = (file) => {
        if (!selectedFiles) {
            return
        }
        let newFileSet = selectedFiles.filter(tempFile => tempFile.name !== file.name)
        if (newFileSet.length === 0) {
            setSelectedFiles(undefined);
        } else {
            selectedFiles(newFileSet)
        }
    }

    const deleteRemote = (file) => {
        UploadService.deleteFile(userInfo, file)
        .then((response) => {
            console.log("Response of delete: ", response.data);
            return UploadService.getFiles(userInfo);
        })
        .then((files) => {
            setFileInfos(files.data)
        })
        .catch(() => {
            setMessage("Could not delete the file!");
            setIsError(true);
        })
    }

    const upload = () => {
        selectedFiles.forEach(currentFile => {
            setProgress(0);
            setCurrentFile(currentFile);

            UploadService.upload(userInfo, currentFile, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
            })
                .then((response) => {
                    setMessage(response.data.message);
                    setIsError(false);
                    return UploadService.getFiles(userInfo);
                })
                .then((files) => {
                    setFileInfos(files.data);
                })
                .catch(() => {
                    setProgress(0);
                    setMessage("Could not upload the file!");
                    setCurrentFile(undefined);
                    setIsError(true);
                })

        });
        setSelectedFiles(undefined);
    }

    const onDatagenEnd = () => {
        setDatagenStatus(!datagenStatus)
        setDatagenDone(true)
    }

    const onDatagenError = () => {
        setDatagenStatus(!datagenStatus)
    }

    console.log("akash", "selected files", selectedFiles)
    return (
        <div className="two-column-container">
            <div className="column left-column">
                {/* Left column content goes here */}
                <div style={{margin: "10px"}}>
                    <SystemMessageModal />
                </div>
                <div style={{margin: "10px"}}>
                    <ToolsModal />
                </div>
                <Typography variant="h6" className="list-header">
                    List of Files
                </Typography>
                <ul className="list-group">
                    <FileList fileInfos={fileInfos} onDelete={deleteRemote}/>
                </ul>
            </div>
            <div className="column right-column">
                {/* Right column content goes here */}
                <MyDropzoneComponent initialFiles={selectedFiles} onFilesDropped={onFilesDropped} onFileDeleted={onFileDeleted} />
                <div className="mg20">
                    {currentFile && (
                        <Box className="mb25" display="flex" alignItems="center">
                            <Box width="100%" mr={1}>
                                <BorderLinearProgress variant="determinate" value={progress} />
                            </Box>
                            <Box minWidth={35}>
                                <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                            </Box>
                        </Box>)
                    }
                    <Button
                        className="btn-upload"
                        color="primary"
                        variant="contained"
                        component="span"
                        disabled={!selectedFiles}
                        onClick={upload}>
                        Upload
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        disabled={!getDatagenReadiness() || datagenStatus || datagenDone}
                        onClick={()=>{setDatagenStatus(!datagenStatus)}}>
                        Run Datagen
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        disabled={!datagenDone}
                        onClick={()=>{console.log("Start chat!"); navigate("/chats")}}>
                        Start Chat
                    </Button>
                    {datagenStatus && <DatagenComponent
                    onDone={onDatagenEnd} onError={onDatagenError}
                    />}
                    {datagenDone && !datagenStatus && <Typography>Datagen Complete!</Typography>}

                    <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                        {message}
                    </Typography>
                </div >
            </div>
        </div>
    );
}

export default UploadFiles;


