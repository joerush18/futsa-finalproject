import { Components, Theme } from "@mui/material";
import Color from "../utils/color";

const componentStyles: Components<Omit<Theme, "components">> = {
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    defaultProps: {
      maxWidth: "xl",
      disableGutters: true,
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    defaultProps: {
      disableGutters: true,
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        width: "32px",
        height: "32px",
        textTransform: "uppercase",
        fontSize: "16px",
        color: Color.white.main,
        backgroundColor: Color.coloredShadows.primary,
        fontWeight: "bold",
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: Color.transparent.main,
        boxShadow: "none",
        color: Color.primary.main,
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      root: {
        fontWeight: 500,
      },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: "none",
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        padding: "4px",
        backgroundColor: Color.white.focus,
        borderRadius: "12px",
        boxShadow:
          "0  1px 5px rgba(154,160,185,0.05), 0 1px 5px rgba(166,173,201,0.2)",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        margin: "0 10px",
        borderRadius: "5px",
      },
    },
  },

  MuiModal: {
    styleOverrides: {
      root: {
        display: "grid",
        placeItems: "center",
        height: "100vh",
      },
    },
  },
};

export default componentStyles;
