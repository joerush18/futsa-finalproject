"use client";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  styled,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PaymentIcon from "@mui/icons-material/Payment";
import InboxIcon from "@mui/icons-material/Inbox";
import EventIcon from "@mui/icons-material/Event";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Color from "@/utils/color";
import Box from "@mui/material/Box/Box";

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
    title: "Dashboard",
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
    path: "news",
    title: "News",
    icon: <NewspaperIcon />,
  },
  {
    path: "events",
    title: "Events",
    icon: <EventIcon />,
  },
];

const Sidebar = () => {
  const currentPage = usePathname();
  const location = currentPage.split("/")[2] ?? "";
  return (
    <StyledDrawer elevation={2} variant="permanent" anchor="left">
      <StyledBox>
        <Link href="/">
          <Typography variant="h5" textAlign="center" mb={3}>
            FUTSA DASHBOARD
          </Typography>
        </Link>
        <List>
          {sideMenus.map((item, index) => (
            <Link key={index} href={`/dashboard/${item.path}`}>
              <ListItem disablePadding>
                <StyledListItemButton selected={location === `${item.path}`}>
                  <ListItemIcon color={Color.white.main}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </StyledListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </StyledBox>
    </StyledDrawer>
  );
};

export default Sidebar;

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
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
