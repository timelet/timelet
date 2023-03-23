import { TimeletUIProvider } from "@timelet/ui";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TimeletUIProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </TimeletUIProvider>
  </React.StrictMode>
);
