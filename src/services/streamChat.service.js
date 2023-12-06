import { BASE_URL } from "./config";

export function createChatConnection(userInfo, sessionId, userMessage, orgId, botId) {
    const params = new URLSearchParams();
    params.set("org", orgId);
    params.set("bot", botId);
    params.set("user", userInfo.email);
    params.set("session", sessionId);
    params.set("message", userMessage);
    // console.log("Query params for the Streaming: ", params.toString());
    const url = `${BASE_URL}${"/maestro_chat/v1/chat/stream?"}${params.toString()}`;
    // console.log("akash", "createChatConnection", url);
    const eventSource = new EventSource(url);
    return eventSource;
}