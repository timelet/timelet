import { ThemeProvider } from "@timelet/ui";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
