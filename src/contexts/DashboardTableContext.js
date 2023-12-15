import { createContext, useEffect, useState } from "react";
import { dataSet,orgData } from "../utils/data";
import { Box, CircularProgress } from "@mui/material";

// Context
export const DashboardTableContext = createContext({
  data: [],
});

// Provider

const DashboardTableContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(dataSet);
      setIsLoading(false);
    }, 5000);
  }, []);

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
