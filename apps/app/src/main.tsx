import { ThemeProvider } from "@timelet/ui";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider withGlobalStyles withNormalizeCSS>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
