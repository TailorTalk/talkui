import React, { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../contexts/AuthContext";
import { FormControl, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setBotId,
  setOrgId,
  fetchBots,
  fetchOrgs,
} from "../../store/OrganisationSlice";
import { useSnackbar } from "notistack";


const OrgAndBotSelect = () => {

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { userInfo, isLoggedIn } = useAuth();
  const { bots, botId } = useSelector((state) => state.organisation.bots);
  const { organisations, organisationId } = useSelector(
    (state) => state.organisation.orgs
  );


  useEffect(() => {
    if (isLoggedIn) {
      // console.log(userInfo.name);
      enqueueSnackbar("Logged in successfully", {
        variant: "success",
      });
      dispatch(fetchOrgs({
        email: userInfo.email, userName: userInfo.name
      }))
        .unwrap()
        .then((result) => {
          dispatch(fetchBots(result[0], userInfo.email, userInfo.name));
        })
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
          });
        });
    } else {
      enqueueSnackbar("Login resulted in error. Try logging in again", {
        variant: "error",
      });
    }
  }, [dispatch, isLoggedIn]);

  const handleOrgChange = async (event) => {
    dispatch(fetchBots(event.target.value, userInfo.email, userInfo.name));
    dispatch(setOrgId(event.target.value));
  };
  const handleBotChange = (event) => {
    dispatch(setBotId(event.target.value));
  };


  return (

    <div className="flex gap-2 items-center justify-center flex-wrap  max-sm:justify-start">


      <div className="flex gap-0 items-center">
        <FormControl
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
            value={organisationId}
            onChange={handleOrgChange}
            sx={{
              fontSize: "20px",
              "@media (max-width: 640px)": {
                fontSize: "16px",
              },
            }}
          >
            {organisations.map((org, index) => (
              <MenuItem key={index} value={org}>
                <span>{org}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <span className="text-2xl text-tailorFont">/</span>

        <FormControl
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
            value={botId}
            onChange={handleBotChange}
            sx={{
              fontSize: "20px",
              "@media (max-width: 640px)": {
                fontSize: "16px",
              },
            }}
          >
            {bots.map((bot, index) => (
              <MenuItem key={index} value={bot.botName}>
                {bot.botName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default OrgAndBotSelect