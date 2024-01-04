import http from "./http-common";
import { axiosConsole } from "./http-common";
import { createHeader } from "./http-common";

class ChatService {
  chat(userInfo, sessionId, message, orgId, botId) {
    // console.log("akash", "API call for chat", sessionId, message, orgId, botId);
    sessionId = sessionId ? sessionId : "";
    return http.post(
      "/maestro_chat/v1/chat",
      { query: message, session_id: sessionId },
      {
        headers: createHeader(userInfo, orgId, botId),
      }
    );
  }

  getHistory(userInfo, sessionId, orgId, botId) {
    return http.post(
      "/maestro_chat/v1/session/get",
      { session_id: sessionId },
      {
        headers: createHeader(userInfo, orgId, botId),
      }
    );
  }

  getConversations(bot_id, conversation_id) {
    return axiosConsole.post(
      "/tt_chat_plugin/console/v1/get_conversation_data",
      {
        bot_id,
        conversation_id,
      }
    );
  }

  getSession(userInfo, sessionId, orgId, botId) {
    // console.log("akash", "API call for get session", sessionId);
    return http.post(
      "/maestro_chat/v1/session/get",
      {
        session_id: sessionId,
      },
      {
        headers: createHeader(userInfo, orgId, botId),
      }
    );
  }

  listSessions(userInfo, orgId, botId) {
    // console.log("akash", "API call for list", userInfo, orgId, botId);
    return http.post(
      "/maestro_chat/v1/session/list",
      {},
      {
        headers: createHeader(userInfo, orgId, botId),
      }
    );
  }

  deleteSession(userInfo, sessionId, orgId, botId) {
    // console.log("akash", "API call for delete", sessionId);
    return http.post(
      "/maestro_chat/v1/session/delete",
      {
        session_id: sessionId,
      },
      {
        headers: createHeader(userInfo, orgId, botId),
      }
    );
  }
}

const chatServiceInstance = new ChatService();

export default chatServiceInstance;
