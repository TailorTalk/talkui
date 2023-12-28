import { axiosConsole } from "./http-common";

class DashboardService {
  getBotData(selectedBot) {
    return axiosConsole.post(
      "/tt_chat_plugin/console/v1/get_bot_data",
      {
        bot_id: selectedBot,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  }
}

const dashboardService = new DashboardService();

export default dashboardService;
