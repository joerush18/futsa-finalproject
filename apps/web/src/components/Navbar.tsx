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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "core/src/db/hooks/useAuth";
import useUserStore from "@/store/useUserStore";

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
  const { futsal } = useUserStore();
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" elevation={1}>
      <StyledToolbar>
        <Breadcrumbs>
          {pathname.split("/").map((path, index) => {
            if (index === 0) {
              return (
                <NavLink to="/dashboard" key={index}>
                  <HomeIcon fontSize="medium" />
                </NavLink>
              );
            } else {
              return (
                <NavLink to={`/${path}`} key={index}>
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
            src={futsal?.profilePicture ?? ""}
          />
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
        sx={{ marginTop: "3.5rem" }}
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
        <MenuItem
          onClick={() => {
            navigate("/");
            logout();
          }}
        >
          {logOutLoading ? "Logging out" : "Log out"}
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
