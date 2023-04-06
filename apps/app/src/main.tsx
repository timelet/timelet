import { TimeletUIProvider } from "@timelet/ui";
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import enUSMessages from "../../../assets/localization/en-US.json";
import { DatabaseProvider } from "./persistence/DatabaseProvider";

const messages = enUSMessages;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DatabaseProvider>
    <React.StrictMode>
      <IntlProvider messages={messages} locale="en-US" defaultLocale="en-US">
        <TimeletUIProvider withGlobalStyles withNormalizeCSS>
          <RouterProvider router={router} />
        </TimeletUIProvider>
      </IntlProvider>
    </React.StrictMode>
  </DatabaseProvider>
);
