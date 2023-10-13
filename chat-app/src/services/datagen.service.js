import { BASE_URL } from "./config";

export function createDatagenConnection(userInfo) {
    const headers = {
        "X-USER-EMAIL": userInfo.email,
        "X-USER-NAME": userInfo.name
    }
    console.log("akash", "Header for SSE", headers)
    const url = `${BASE_URL}${"/maestro_chat/v1/datagen?"}${"user="}${userInfo.email}`;
    const eventSource = new EventSource(url, {headers: headers});
    return eventSource;
}
