import { createTheme, responsiveFontSizes } from "@mui/material";

import componentStyles from "./components";
import { appPalette } from "./palette";
import { typography } from "./typography";
import globals from "./globals";

let theme = createTheme({
  palette: appPalette,
  typography,
  components: {
    ...componentStyles,
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
      },
    },
  },
});

theme = responsiveFontSizes(theme);
export { theme };
