import {
  AppBar,
  Toolbar,
  styled,
  Avatar,
  Badge,
  Box,
  Typography,
  Chip,
  MenuItem,
  IconButton,
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
import { NOTIFICATION_TYPE, useLogout } from "core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationContent from "./homepage/notification/NotificationContent";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Color from "@/utils/color";

const Navbar = () => {
  // const [notificationPop, setNotificationPop] = useState<boolean>(false);
  const { mutate: logout, isLoading: logOutLoading } = useLogout();
  const navigate = useNavigate();
  const { onClose, onOpen, open } = useModal();
  const {
    onClose: onNotificationClose,
    onOpen: onNotificationOpen,
    open: notification,
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
            open={notification}
            onClose={onNotificationClose}
            messages={
              <>
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
                  <NotificationContent
                    type={NOTIFICATION_TYPE.BOOKING_CANCELLED}
                    date="2 days ago"
                    impDate="Mon 24 July, 9:00 AM"
                    username="Ramu Kaka"
                    viewed={true}
                  />
                  <NotificationContent
                    type={NOTIFICATION_TYPE.BOOKING}
                    date="10 days ago"
                    impDate="Mon 24 July, 8:00 AM"
                    username="Joerush"
                    viewed={false}
                  />
                </Box>
              </>
            }
            sx={{
              marginTop: 6,
              padding: 0,
              minHeight: "70vh",
            }}
            paperMinW="300px"
          >
            <Badge badgeContent={10} color="error" onClick={onNotificationOpen}>
              <NotificationsIcon
                sx={{
                  color: notification ? Color.primary.focus : Color.grey[500],
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
