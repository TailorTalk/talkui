import http from "./http-common";
import { createHeader } from "./http-common";

class ChatService {
    chat(userInfo, sessionId, message, orgId, botId) {
        console.log("akash", "API call for chat", sessionId, message, orgId, botId);
        sessionId = sessionId ? sessionId : "";
        return http.post("/maestro_chat/v1/chat", 
            {"query": message, "session_id": sessionId}, 
            {
                headers: createHeader(userInfo, orgId, botId)
            });
    }

    getSession(userInfo, sessionId, orgId, botId) {
        console.log("akash", "API call for get session", sessionId);
        return http.post("/maestro_chat/v1/session/get", 
        {
            "session_id": sessionId
        },
        {
            headers: createHeader(userInfo, orgId, botId)

        })
    }

    listSessions(userInfo, orgId, botId) {
        console.log("akash", "API call for list", userInfo, orgId, botId);
        return http.post("/maestro_chat/v1/session/list", 
        {},
        {
            headers: createHeader(userInfo, orgId, botId)
        });
    }

    deleteSession(userInfo, sessionId, orgId, botId) {
        console.log("akash", "API call for delete", sessionId);
        return http.post("/maestro_chat/v1/session/delete", 
        {
            "session_id": sessionId
        },
        {
            headers: createHeader(userInfo, orgId, botId)

        })
    }
}

const chatServiceInstance = new ChatService();

export default chatServiceInstance;
