import { BASE_URL } from "./config";

export function createChatConnection(userInfo, sessionId, userMessage) {
    console.log("akash", "createChatConnection", userInfo, sessionId, userMessage);
    const params = new URLSearchParams();
    params.set("user", userInfo.email);
    params.set("session", sessionId);
    params.set("message", userMessage);
    const url = `${BASE_URL}${"/maestro_chat/v1/chat/stream?"}${params.toString()}`;
    console.log("akash", "createChatConnection", url);
    const eventSource = new EventSource(url);
    return eventSource;
}