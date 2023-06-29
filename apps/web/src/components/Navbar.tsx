"use client";

import {
  AppBar,
  Toolbar,
  styled,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  Popover,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [notificationPop, setNotificationPop] = useState<boolean>(false);

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "primary",
  });

  const Icons = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    color: "primary",
  });

  return (
    <AppBar position="sticky" elevation={1} >
      <StyledToolbar>
        <MenuIcon />
        <Icons>
          <Badge
            badgeContent={4}
            color="error"
            onClick={() => setNotificationPop(true)}
          >
            <NotificationsIcon />
          </Badge>
          <Avatar
            onClick={() => setOpen(true)}
            alt="Joe Rush"
            src="https://scontent.fbwa1-1.fna.fbcdn.net/v/t39.30808-6/298116877_3190056711212201_9210910571884257411_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=clc-5wEaWJgAX-wpDWF&_nc_oc=AQniRC7wBZQo9MLmhs2iKhIAOJvl8EoYzdD1OzArZQR5rw_SXSmIppZpESAkwwPRXW0&_nc_ht=scontent.fbwa1-1.fna&oh=00_AfAIuq9_OadiVAGJQrCesyafLEgU3YjyFO8ECbcC57Cmrg&oe=638C03BC"
          />
          <Popover
            id="notification"
            open={notificationPop}
            onClose={() => setNotificationPop(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              marginTop: "-50px",
            }}
          >
            <Typography sx={{ p: 2 }}>
              This is the Notification Page Okay.
            </Typography>
          </Popover>
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
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
