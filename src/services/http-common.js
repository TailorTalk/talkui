import axios from "axios";
import { BASE_URL, BASE_URL_CONSOLE } from "./config";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export const axiosConsole = axios.create({
  baseURL: BASE_URL_CONSOLE
});

export function createHeader(userInfo, orgId, botId) {
  return {
    "X-USER-EMAIL": userInfo.email,
    "X-USER-NAME": userInfo.name,
    "X-ORG-ID": orgId,
    "x-org-chat-bot-id": botId,
  };
}
