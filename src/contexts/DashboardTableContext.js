import { createContext, useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { unixToFormattedDate, formatString } from "../utils/utils";
import { useSnackbar } from "notistack";
import dashboardService from "../services/dashboard.service";
import { botsAndSelectedBot } from "../store/OrganisationSlice";

// Context
export const DashboardTableContext = createContext({
  data: [],
});

// Provider

const DashboardTableContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedBot } = useSelector(botsAndSelectedBot);
  const { enqueueSnackbar } = useSnackbar();

  const formatData = (dataArray) => {
    const formattedData = dataArray.map((data) => {
      const newObj = {};
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
      try {
        const res = await dashboardService.getBotData(
          selectedBot.org_chat_bot_id
        );
        console.log(res);
        setData(formatData(res.data.result));
        enqueueSnackbar("Data is fetched successfully", {
          variant: "success",
        });
      } catch (err) {
        enqueueSnackbar("Something went wrong!", {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedBot.org_chat_bot_id) {
      console.log("I RAN");
      fetchBotData();
    } else {
      setData([]);
      console.log("I RAN But in else");
      enqueueSnackbar("Add bot to fetch data", {
        variant: "error",
      });

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
