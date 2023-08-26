import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import {
  styled,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PaymentIcon from "@mui/icons-material/Payment";
import InboxIcon from "@mui/icons-material/Inbox";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Color from "@/utils/color";
import Box from "@mui/material/Box/Box";
import { NavLink, useLocation } from "react-router-dom";
import { RequestQuote } from "@mui/icons-material";

const drawerWidth = 270;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    padding: theme.spacing(2),
    backgroundColor: Color.background.default,
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: 10,
  backgroundColor: Color.gradients.dark.main,
  height: "100vh",
  color: "white",
  padding: theme.spacing(2),
}));

const sideMenus = [
  {
    path: "",
    title: "Home",
    icon: <InboxIcon />,
  },
  {
    path: "bookings",
    title: "Bookings",
    icon: <AssessmentIcon />,
  },
  {
    path: "payments",
    title: "Payments",
    icon: <PaymentIcon />,
  },
  {
    path: "requests",
    title: "Requests",
    icon: <RequestQuote />,
  },
  {
    path: "create-event",
    title: "Create Event",
    icon: <AddBoxIcon />,
  },
  {
    path: "events",
    title: "Events",
    icon: <EventIcon />,
  },
  {
    path: "profile",
    title: "Profile",
    icon: <PersonIcon />,
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const location = pathname.split("/")[1];
  return (
    <StyledDrawer elevation={2} variant="permanent" anchor="left">
      <StyledBox>
        <NavLink to="/">
          <Typography variant="h5" textAlign="center" mb={3}>
            FUTSA DASHBOARD
          </Typography>
        </NavLink>
        <List>
          {sideMenus.map((item, index) => (
            <NavLink key={index} to={`/${item.path}`}>
              <ListItem disablePadding>
                <StyledListItemButton selected={location === `${item.path}`}>
                  <ListItemIcon color={Color.white.main}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </StyledListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </StyledBox>
    </StyledDrawer>
  );
};

export default Sidebar;

const StyledListItemButton = styled(ListItemButton)(() => ({
  borderRadius: 10,
  marginBottom: 5,
  alignItems: "center",
  "&.Mui-selected": {
    backgroundColor: Color.primary.main,
    color: Color.white.main,
    "&:hover": {
      backgroundColor: Color.primary.main,
      color: Color.white.main,
    },
  },
  "&:hover": {
    backgroundColor: Color.grey[600],
    color: Color.white.main,
  },
  "& .MuiListItemIcon-root": {
    color: Color.white.main,
  },
}));
