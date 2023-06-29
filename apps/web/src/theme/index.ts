
import {createTheme, responsiveFontSizes} from "@mui/material";

import componentStyles from "./components";
import {appPalette} from "./palette";
import {textStyles} from "./typography";

let theme = createTheme({
  palette: appPalette,
  typography: textStyles,
  components: componentStyles,
});

theme = responsiveFontSizes(theme);

export {theme};