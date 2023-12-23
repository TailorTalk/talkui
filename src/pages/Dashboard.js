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
    <div className="px-4 pt-4 max-sm:py-8  flex justify-center overflow-hidden flex-1 ">
      <div className="relative overflow-hidden w-full h-full pt-2 flex flex-col">
        <TextField
          id="outlined-basic"
          label="Search leads"
          className="mb-4"
          variant="outlined"
          size="medium"
          sx={{
            maxWidth:"240px",
            marginBottom:'8px',
            '& .MuiOutlinedInput-root':{
              borderRadius:'50px'
            }
          }}
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
        <FilteredDataTable />
      </div>
    </div>
  );
};

export default Dashboard;
