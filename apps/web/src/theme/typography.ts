import { Typography } from "@mui/material/styles/createTypography";

import Color from "@/utils/color";

export const typography: Partial<Typography> = {
  h1: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  h2: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  h3: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  h4: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  h5: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  h6: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  subtitle1: {
    fontSize: "14px",
    color: Color.grey[500],
    marginBottom: "2rem",
  },
  body1: {
    fontSize: "14px",
    fontWeight: 300,
  },
  body2: {
    fontSize: "14px",
    fontWeight: 600,
  },
};
