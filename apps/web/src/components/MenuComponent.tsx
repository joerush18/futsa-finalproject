import * as React from "react";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMenu from "@/hooks/useMenu";
import Color from "@/utils/color";

export interface IMenuItems {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}
interface IMenuComponentProps extends MenuProps {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  menuItems?: IMenuItems[];
  paperMinW?: string;
  messages?: React.ReactNode;
}

export default function MenuComponent({
  children,
  onClose,
  open,
  menuItems,
  paperMinW = "150px",
  messages,
  ...props
}: IMenuComponentProps) {
  return (
    <React.Fragment>
      {children}
      <Menu
        key={"menu-pop"}
        {...props}
        id="account-menu"
        open={open}
        onClose={onClose}
        onClick={onClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            mt: 1,
            minWidth: paperMinW,
            border: "1px solid #e0e0e0",
            bgcolor: Color.grey[100],
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {menuItems
          ? menuItems.map((menu, index) => {
              return (
                <MenuItem onClick={menu.onClick} key={`menuItems_${index}`}>
                  {menu.label}
                </MenuItem>
              );
            })
          : ""}
        {messages}
      </Menu>
    </React.Fragment>
  );
}
