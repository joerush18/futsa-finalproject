import { Typography } from "@mui/material/styles/createTypography";
import Color from "@/utils/color";

export const textStyles: Partial<Typography> = {
  fontFamily: ["Montserrat", "sans-serif"].join(","),
  h1: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "16px",
    lineHeight: "1.2",
  },
  h2: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "12px",
    lineHeight: "1.3",
  },
  h3: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "12px",
    lineHeight: "1.4",
  },
  h4: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    lineHeight: "1.4",
  },
  h5: {
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "1.5",
  },
  h6: {
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "1.5",
  },
  subtitle1: {
    fontSize: "14px",
    fontWeight: 600,
    color: Color.grey[600],
    marginBottom: "1rem",
    lineHeight: "1.6",
  },
  body1: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "1.6",
  },
  body2: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "1.6",
  },
  caption: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "1.6",
  },
};
