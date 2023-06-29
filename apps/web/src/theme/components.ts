import {Components, Theme} from "@mui/material";
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
        color: Color.White,
        backgroundColor: Color.Cream,
        fontWeight: "bold",
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: Color.White,
        boxShadow: "none",
        color : Color.Primary
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

  MuiDivider : {
    styleOverrides : {
      root : {
        color : Color.LighterGray
      }
    }
  }
};

export default componentStyles;