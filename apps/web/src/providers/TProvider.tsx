"use client";

import { ThemeProvider } from "@mui/material/styles";
import {theme} from "@/theme";

const TProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default TProvider;
