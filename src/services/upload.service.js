import http from "./http-common";

class UploadFilesService {
    upload(userInfo, file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return http.post("/maestro_chat/v1/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            },
            onUploadProgress,
        });
    }

    getFiles(userInfo) {
        return http.get("/maestro_chat/v1/files", {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            }
        });
    }

    deleteFile(userInfo, file) {
        // console.log("akash", "API call for delete", file);
        return http.post("/maestro_chat/v1/file/delete", 
        {
            "file": file.name
        },
        {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            },

        })
    }

    triggerDatagen(userInfo) {
        // console.log("akash", "Triggering datagen");
        return http.post("/maestro_chat/v1/datagen", {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            },
        })
    }

    getSystemMessage(userInfo) {
        // console.log("akash", "Getting system message");
        return http.get("/maestro_chat/v1/system_message/get", {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            },
        })
    }

    setSystemMessage(userInfo, message) {
        // console.log("akash", "Setting system message", message);
        return http.post("/maestro_chat/v1/system_message/set", {
            "system_message": message
        },
        {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            },
        })
    }

    listTools(userInfo) {
        // console.log("akash", "Getting tools");
        return http.get("/maestro_chat/v1/tools/list", {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            },
        })
    }

    setTool(userInfo, tool) {
        // console.log("akash", "Setting tool", tool);
        return http.post("/maestro_chat/v1/tool/set", tool,
        {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            },
        })
    }
}

const uploadFilesServiceInstance = new UploadFilesService();

export default uploadFilesServiceInstance;
