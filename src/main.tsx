import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import themes from "./theme";
import type { LOCALE } from "./shared/contexts/i18n/i18n.ts";

const theme = createTheme(themes);
const userLang = navigator.language;
const langOnly = userLang?.split("-")[0] as LOCALE;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App lang={langOnly ?? "es"} />
    </ThemeProvider>
  </StrictMode>
);
