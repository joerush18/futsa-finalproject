import { createTheme, responsiveFontSizes } from "@mui/material";

import componentStyles from "./components";
import { appPalette } from "./palette";
import { textStyles } from "./typography";
import globals from "./globals";

let theme = createTheme({
  palette: appPalette,
  typography: textStyles,
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
