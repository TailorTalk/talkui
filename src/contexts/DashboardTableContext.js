import { createContext, useEffect, useState } from "react";
import { dataSet } from "../utils/data";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { unixToFormattedDate, formatString } from "../utils/utils";

// Context
export const DashboardTableContext = createContext({
  data: [],
});

// Provider

const DashboardTableContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedBot = useSelector((state) => state.organisation.bots.botChatId);

  const formatData = (dataArray) => {
    const formattedData = dataArray.map((data) => {
      const newObj = {};
      // const formattedTimeCreated = unixToFormattedDate(data.time_created);
      // const formattedTimeUpdated = unixToFormattedDate(data.time_updated);
      delete data.id;
      for (const key in data) {
        if (data.hasOwnProperty(key)) {

          if (key === "time_created" || key === "time_updated") {
            newObj[formatString(key)] = unixToFormattedDate(data[key]);
          } else {
            newObj[formatString(key)] = data[key];
          }
        }
      }
// console.log(newObj);
      return newObj;
    });
    console.log(formattedData);
    return formattedData;
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchBotData = async () => {
      try {
        const res = await axios.post(
          "https://externalchatplugins-preview.up.railway.app/tt_chat_plugin/console/v1/get_bot_data",
          { bot_id: selectedBot },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setData(formatData(res.data.result));
        
        setIsLoading(false);
      } catch (err) {
        setData([]);
        setIsLoading(false);
      }
    };
    if (selectedBot) {
      fetchBotData();
    } else {
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
