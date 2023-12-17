import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { FilterAlt, Search } from "@mui/icons-material";

import BasicTable from "../components/Table/Table";

import useData from "../hooks/useData";
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
      <div className="relative overflow-hidden w-full py-2">
        <TextField
          id="outlined-basic"
          label="Search leads"
          className="mb-4"
          variant="outlined"
          size="medium"
          sx={{
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

export default Dashboard;
