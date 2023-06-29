import {PaletteOptions} from "@mui/material/styles/createPalette";
import Color from "@/utils/color";

export const appPalette: PaletteOptions = {
  primary: {
    main: Color.Primary,
  },
  secondary: {
    main: Color.Cream,
  },
  info: {
    main: "#000",
  },
  error: {
    main: Color.Red,
  },
  success: {
    main: Color.Green,
  },
  background: {
    default: Color.Background,
  },
};