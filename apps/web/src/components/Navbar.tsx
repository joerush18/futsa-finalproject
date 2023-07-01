import {
  AppBar,
  Toolbar,
  styled,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink, useLocation } from "react-router-dom";
import { useLogout } from "core/src/db/hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [notificationPop, setNotificationPop] = useState<boolean>(false);
  const { mutate: logout, isLoading: logOutLoading } = useLogout();

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "primary",
  });

  const Icons = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    color: "gray",
  });

  const { pathname } = useLocation();

  return (
    <AppBar position="sticky" elevation={1}>
      <StyledToolbar>
        <Breadcrumbs>
          {pathname.split("/").map((path, index) => {
            if (index === 0) {
              return (
                <NavLink to="/dashboard">
                  <HomeIcon fontSize="medium" />
                </NavLink>
              );
            } else {
              return (
                <NavLink to={`/${path}`}>
                  <Typography textTransform="capitalize" variant="body2">
                    {path}
                  </Typography>
                </NavLink>
              );
            }
          })}
        </Breadcrumbs>
        <Icons alignItems="center" gap="4px">
          <TextField variant="outlined" label="Search here" size="small" />
          <Avatar
            onClick={() => setOpen(true)}
            alt="Joe Rush"
            src="https://scontent.fbwa1-1.fna.fbcdn.net/v/t39.30808-6/298116877_3190056711212201_9210910571884257411_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=clc-5wEaWJgAX-wpDWF&_nc_oc=AQniRC7wBZQo9MLmhs2iKhIAOJvl8EoYzdD1OzArZQR5rw_SXSmIppZpESAkwwPRXW0&_nc_ht=scontent.fbwa1-1.fna&oh=00_AfAIuq9_OadiVAGJQrCesyafLEgU3YjyFO8ECbcC57Cmrg&oe=638C03BC"
          />
          <SettingsIcon />
          <Badge
            badgeContent={0}
            color="error"
            onClick={() => setNotificationPop(true)}
          >
            <NotificationsIcon />
          </Badge>
        </Icons>
      </StyledToolbar>
      <Menu
        sx={{ marginTop: "3.2rem" }}
        id="demo-positioned-menu"
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() => setOpen(false)}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={() => logout()}>
          {logOutLoading ? "Logging out" : "Log out"}
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
