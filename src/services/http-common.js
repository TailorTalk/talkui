import axios from "axios";
import { BASE_URL } from "./config";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

export function createHeader(userInfo, orgId, botId) {
    return {
        "X-USER-EMAIL": userInfo.email,
        "X-USER-NAME": userInfo.name,
        "X-ORG-ID": orgId,
        "x-org-chat-bot-id": botId
    }
}