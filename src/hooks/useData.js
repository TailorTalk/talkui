import { useContext } from "react";
import { DashboardTableContext } from "../contexts/DashboardTableContext";

const useData = () => {
  return useContext(DashboardTableContext);
};

export default useData;
