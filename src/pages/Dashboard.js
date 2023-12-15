import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { FilterAlt, Search } from "@mui/icons-material";

import BasicTable from "../components/Table/Table";

import useData from "../hooks/useData";

const Dashboard = () => {
  const { data } = useData();
  const [search, setSearch] = useState("");

  const FilteredDataTable = () => {
    let filteredData = data;

    filteredData = filteredData.filter((dataObj) => {
      return dataObj.name.toLowerCase().includes(search.toLowerCase());
    });
    return <BasicTable data={filteredData} />;
  };

  return (
    <div className="px-4 py-4 max-sm:py-8  flex justify-center overflow-hidden">
      <div className="relative overflow-hidden w-full ">
        <div className="flex max-sm:flex-col justify-between items-center bg-[#FBFBFB] py-[16px] px-[10px] border-[1px] border-[#D3D3D3] rounded-xl mb-4 w-full  max-md:gap-4">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
            
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              sx: {
                color: "#717171",
              },
            }}
          />
          <div className="flex gap-6 max-sm:gap-4 h-full">
            <Button
              variant="filled"
              startIcon={<FilterAlt />}
              sx={{
                backgroundColor: "#fff",
                height: '40px',
                color: "#717171",
                textTransform: "none",
                boxShadow: "none",
                border: "1px solid #D3D3D3",
                "&:hover": { backgroundColor: "white" },
                "@media (max-width: 640px)": {
                  fontSize: "12px",
                  padding: "2px",
                },
              }}
            >
              Filter
            </Button>
          </div>
        </div>
        <FilteredDataTable />
      </div>
    </div>
  );
};

export default Dashboard;
