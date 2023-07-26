import {
  Toolbar,
  styled,
  Avatar,
  Badge,
  Box,
  Typography,
  Chip,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import TextField from "@mui/material/TextField/TextField";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import MenuComponent, { IMenuItems } from "./MenuComponent";
import useModal from "@/hooks/useModal";
import { INotification, formatBookingDate, timeAgo, useLogout } from "core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationContent from "./homepage/notification/NotificationContent";
import Color from "@/utils/color";
import useNotifications from "@/hooks/useNotifications";

const Navbar = () => {
  const { mutate: logout, isLoading: logOutLoading } = useLogout();
  const navigate = useNavigate();
  const { onClose, onOpen, open } = useModal();
  const {
    onClose: onNotificationClose,
    onOpen: onNotificationOpen,
    open: notificationOpen,
  } = useModal();

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

  const MENUITEMS: IMenuItems[] = [
    {
      label: "Profile",
      icon: <AccountCircleIcon />,
      onClick: () => {
        navigate("profile");
      },
    },
    {
      label: logOutLoading ? "Logging out" : "Log out",
      icon: <AccountCircleIcon />,
      onClick: () => {
        navigate("/");
        logout();
      },
    },
  ];

  const { notifications } = useNotifications();

  return (
    <Box position="sticky">
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
          <MenuComponent
            open={notificationOpen}
            onClose={onNotificationClose}
            messages={
              <Box>
                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mx={2}
                  mb={1}
                >
                  <Typography variant="h6">Notifications</Typography>
                  <Button variant="text">
                    <Typography variant="caption">See all</Typography>
                  </Button>
                </Stack>
                <Divider />
                <Box>
                  {notifications.length === 0 ? (
                    <Typography variant="body2" textAlign="center" mt={2}>
                      No notifications
                    </Typography>
                  ) : (
                    notifications.map((notification: INotification) => {
                      if (!notification) {
                        return null;
                      }
                      return (
                        <NotificationContent
                          key={notification.id}
                          type={notification.type}
                          date={timeAgo(notification.createdAt)}
                          impDate={formatBookingDate(
                            notification.bookedForTime?.toString() ?? ""
                          )}
                          username={notification?.createdBy?.name ?? ""}
                          viewed={notification.viewed}
                        />
                      );
                    })
                  )}
                </Box>
              </Box>
            }
            sx={{
              marginTop: 6,
              padding: 0,
              minHeight: "70vh",
            }}
            paperMinW="400px"
          >
            <Badge
              badgeContent={notifications?.length ?? 0}
              color="error"
              onClick={onNotificationOpen}
            >
              <NotificationsIcon
                sx={{
                  color: notificationOpen
                    ? Color.primary.focus
                    : Color.grey[500],
                }}
              />
            </Badge>
          </MenuComponent>
          <MenuComponent
            open={open}
            onClose={onClose}
            sx={{
              marginTop: 6,
            }}
            menuItems={MENUITEMS}
          >
            <Chip
              onClick={onOpen}
              avatar={
                <Avatar alt="Joe Rush" src={futsal?.profilePicture ?? ""} />
              }
              label={futsal?.futsalName ?? ""}
              variant="outlined"
              sx={{
                borderColor: open ? Color.primary.focus : Color.grey[500],
                bgcolor: open ? Color.grey[300] : Color.grey[200],
              }}
            />
          </MenuComponent>
        </Icons>
      </StyledToolbar>
    </Box>
  );
};

export default Navbar;
