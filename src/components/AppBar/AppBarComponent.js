import React, { useEffect } from "react";
import Logo from "../../assets/logo.svg";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../contexts/AuthContext";
import { FormControl, InputLabel, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setBotId,
  setOrgId,
  fetchBots,
  fetchOrgs,
} from "../../store/OrganisationSlice";
 import { useLocation } from "react-router-dom";

const settings = ["Logout"];

function AppBarComponent() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { userInfo, isLoggedIn, logout } = useAuth();
  const { organisations, organisationId } = useSelector(
    (state) => state.organisation.orgs
  );
  const { bots, botId } = useSelector((state) => state.organisation.bots);
  const dispatch = useDispatch();
  const location = useLocation();


  const isDashboard = location.pathname === "/dashboard";

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (menuItem) => {
    // console.log("akash", menuItem)
    if (menuItem === "Logout") {
      logout();
    }
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchOrgs())
        .unwrap()
        .then((result) => {
          console.log("Yo");
          console.log(result);
          dispatch(fetchBots(result[0]));
        });
    }
  }, [dispatch, isLoggedIn]);

  const handleOrgChange = async (event) => {
    dispatch(fetchBots(event.target.value));
    dispatch(setOrgId(event.target.value));
  };
  const handleBotChange = (event) => {
    dispatch(setBotId(event.target.value));
  };

  return (
    <header className="w-full  bg-white h-[8vh] ">
      <nav className="flex justify-between py-2 px-4 max-sm:px-4  items-center">
        <div className="flex gap-2 items-center justify-center flex-wrap  max-sm:justify-start">
          {(isLoggedIn && isDashboard) ? (
            <div className="flex gap-0 items-center">
              <FormControl
                variant="outlined"
                
                sx={{
                  margin:'0px',
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
                    fontSize:'20px',
                    '@media (max-width: 640px)': {
                      fontSize: '16px',
                    }
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
                    fontSize:'20px',
                    '@media (max-width: 640px)': {
                      fontSize: '16px',
                    }
                  }}
                >
                  {bots.map((bot, index) => (
                    <MenuItem key={index} value={bot}>
                      {bot}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ) : (
            ""
          )}
        </div>

        {isLoggedIn ? (
          <div className="flex gap-6">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User" src={userInfo.picture} sx={{width:'36px',height:'36px'}} />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
}
export default AppBarComponent;
