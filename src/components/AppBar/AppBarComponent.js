import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import OrgAndBotSelect from "./OrgAndBotSelect";

const settings = ["Logout"];

function AppBarComponent() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { userInfo, isLoggedIn, logout } = useAuth();
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

  return (
    <header className="w-full  bg-white ">
      <nav className="flex justify-between py-2 px-4 items-center h-[7vh] ">
        <div className="flex gap-2 items-center justify-center flex-wrap  max-sm:justify-start">
          {isLoggedIn && isDashboard && <OrgAndBotSelect />}
        </div>

        {isLoggedIn ? (
          <div className="flex gap-6">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="User"
                src={userInfo.picture}
                sx={{ width: "36px", height: "36px" }}
              />
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
