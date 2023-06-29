"use client";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
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
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 230;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
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
      <StyledToolbar>
        <Link href="/">
          <Typography variant="h3" textAlign="center">
            FUTSA
          </Typography>
        </Link>
      </StyledToolbar>
      <Divider />
      <List>
        {sideMenus.map((item, index) => (
          <Link key={index} href={`/dashboard/${item.path}`}>
            <ListItem disablePadding>
              <ListItemButton selected={location === `${item.path}`}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
