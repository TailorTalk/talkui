import { axiosConsole } from "./http-common";

class DashboardService {
  getBotData(selectedBot) {
    return axiosConsole.post(
      "/maestro_chat/console/v1/get_bot_data",
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
