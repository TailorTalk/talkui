import { useContext } from "react";
import { DashboardTableContext } from "../contexts/DashboardTableContext";

const useDashboardData = () => {
  return useContext(DashboardTableContext);
};

export default useDashboardData;
