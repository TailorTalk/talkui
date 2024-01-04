import React, { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../contexts/AuthContext";
import { FormControl, Select, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedBot,
  setSelectedOrg,
  fetchBots,
  fetchOrgs,
  botsAndSelectedBot,
  orgsAndSelectedOrg
} from "../../store/OrganisationSlice";
import { useSnackbar } from "notistack";


const OrgAndBotSelect = () => {

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { userInfo, isLoggedIn } = useAuth();
  const { bots, selectedBot, botStatus } = useSelector(botsAndSelectedBot);
  const { orgs, selectedOrg, orgStatus } = useSelector(orgsAndSelectedOrg);
  console.log(selectedBot);
  console.log(selectedOrg);


  useEffect(() => {
    // if (isLoggedIn) {
    // // console.log(userInfo.name);
    // enqueueSnackbar("Logged in successfully", {
    //   variant: "success",
    // });
    dispatch(fetchOrgs(userInfo))
      .unwrap()
      .then((result) => {
        if (result.length !== 0) {
          dispatch(fetchBots(result[0].name, userInfo));
        } else {
          dispatch(setSelectedBot(""))
        }
      })
    // }
    //  else {
    //   enqueueSnackbar("Login resulted in error. Try logging in again", {
    //     variant: "error",
    //   });
    // }
  }, []);

  const handleOrgChange = async (event) => {
    console.log(event.target.value);
    dispatch(fetchBots(event.target.value, userInfo));
    dispatch(setSelectedOrg(event.target.value));
  };
  const handleBotChange = (event) => {
    dispatch(setSelectedBot(event.target.value));
  };


  return (

    <div className="flex gap-2 items-center justify-center flex-wrap  max-sm:justify-start">

      <div className="flex gap-0 items-center">
        {orgStatus === "succeeded" ? <FormControl
          variant="outlined"
          sx={{
            margin: "0px",
            minWidth: "80px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <Select
            labelId="organisations-label"
            id="organisations-id"
            value={selectedOrg.name}

            onChange={handleOrgChange}
            sx={{
              fontSize: "20px",
              "@media (max-width: 640px)": {
                fontSize: "16px",
              },
            }}
          >
            {orgs.map((org, index) => (
              <MenuItem key={index} value={org.name}>
                <span>{org.name}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl> :<Skeleton variant="rounded" width={100} height={24} sx={{borderRadius:"8px",marginRight:"4px"}} />}

        <span className="text-2xl text-tailorFont">/</span>

        {botStatus === "succeeded" ? <FormControl
          variant="outlined"
          sx={{
            m: 1,
            minWidth: "80px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <Select
            labelId="bots-label"
            id="bots-id"
            value={selectedBot.bot_name?selectedBot.bot_name:""}

            onChange={handleBotChange}
            sx={{
              fontSize: "20px",
              "@media (max-width: 640px)": {
                fontSize: "16px",
              },
            }}
          >
            {bots.map((bot, index) => (
              <MenuItem key={index} value={bot.bot_name}>
                {bot.bot_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> : <Skeleton variant="rounded" width={100} height={24} sx={{borderRadius:"8px",marginLeft:"4px"}} />}
      </div>
    </div>
  )
}

export default OrgAndBotSelect