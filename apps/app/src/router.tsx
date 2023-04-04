import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { CONFIGURATION } from "./configuration";
import { Dashboard } from "./views/Dashboard";

export const router = createBrowserRouter(
  [
    {
      element: <DefaultLayout />,
      children: [{ path: CONFIGURATION.PATHS.DASHBOARD, element: <Dashboard /> }],
    },
  ],
  { basename: CONFIGURATION.BASENAME }
);
