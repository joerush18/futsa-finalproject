import { PaletteOptions } from "@mui/material/styles/createPalette";
import Color from "@/utils/color";

export const appPalette: PaletteOptions = {
  primary: {
    ...Color.primary,
  },
  secondary: {
    ...Color.secondary,
  },
  info: {
    ...Color.info,
  },
  error: {
    ...Color.error,
  },
  success: {
    ...Color.success,
  },
  background: {
    ...Color.background,
  },
};
