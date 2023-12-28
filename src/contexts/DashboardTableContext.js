import { createContext, useEffect, useState, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { unixToFormattedDate, formatString } from "../utils/utils";
import { useNotify } from "./NotifyContext";
import { useSnackbar } from "notistack";
import dashboardService from "../services/dashboard.service";

// Context
export const DashboardTableContext = createContext({
  data: [],
});

// Provider

const DashboardTableContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedBot = useSelector((state) => state.organisation.bots.botChatId);
  const { addMessage, addErrorMessage } = useNotify();
  const controllerRef = useRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formatData = (dataArray) => {
    const formattedData = dataArray.map((data) => {
      const newObj = {};

      // Deleting the id field from the fetched data
      delete data.id;
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          // Formating the fields
          if (key === "time_created" || key === "time_updated") {
            newObj[formatString(key)] = unixToFormattedDate(data[key]);
          } else {
            newObj[formatString(key)] = data[key];
          }
        }
      }
      return newObj;
    });
    return formattedData;
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchBotData = async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();
      try {
        // const res = await axios.post(
        //   "https://externalchatplugins-preview.up.railway.app/tt_chat_plugin/console/v1/get_bot_data",
        //   { bot_id: selectedBot },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     signal: controllerRef.current.signal,
        //   }
        // );

        const res = await dashboardService.getBotData(selectedBot);
        setData(formatData(res.data.result));
        enqueueSnackbar("Data is fetched successfully", {
          variant: "success",
        });
        // addMessage("Data is fetched successfully");
      } catch (err) {
        // addErrorMessage("Something went wrong!");
        enqueueSnackbar("Something went wrong!", {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedBot) {
      fetchBotData();
    } else {
      enqueueSnackbar("Add bot to fetch data", {
        variant: "error",
      });
      setData([]);
      setIsLoading(false);
    }
  }, [selectedBot]);

  const ctxValue = {
    data: data,
  };

  return (
    <DashboardTableContext.Provider value={ctxValue}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#4764FC" }} />
        </Box>
      ) : (
        children
      )}
    </DashboardTableContext.Provider>
  );
};

export default DashboardTableContextProvider;
