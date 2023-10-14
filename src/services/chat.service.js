import http from "./http-common";

class ChatService {
    chat(userInfo, sessionId, message) {
        console.log("akash", "API call for chat", sessionId, message);
        sessionId = sessionId ? sessionId : "";
        return http.post("/maestro_chat/v1/chat", 
            {"query": message, "session_id": sessionId}, 
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-USER-EMAIL": userInfo.email,
                    "X-USER-NAME": userInfo.name
                }
            });
    }

    getSession(userInfo, sessionId) {
        console.log("akash", "API call for get session", sessionId);
        return http.post("/maestro_chat/v1/session/get", 
        {
            "session_id": sessionId
        },
        {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            },

        })
    }

    listSessions(userInfo) {
        console.log("akash", "API call for list", userInfo);
        return http.post("/maestro_chat/v1/session/list", 
        {},
        {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            }
        });
    }

    deleteSession(userInfo, sessionId) {
        console.log("akash", "API call for delete", sessionId);
        return http.post("/maestro_chat/v1/session/delete", 
        {
            "session_id": sessionId
        },
        {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            },

        })
    }
}

const chatServiceInstance = new ChatService();

export default chatServiceInstance;
