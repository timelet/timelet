import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { CONFIGURATION } from "./configuration";
import { Dashboard } from "./views/Dashboard";
import { Categories } from "./views/Categories";
import { Tags } from "./views/Tags";
import { Entries } from "./views/Entries";
import { Settings } from "./views/Settings";

export const router = createBrowserRouter(
  [
    {
      element: <DefaultLayout />,
      children: [
        { path: CONFIGURATION.PATHS.CATEGORIES, element: <Categories /> },
        { path: CONFIGURATION.PATHS.DASHBOARD, element: <Dashboard /> },
        { path: CONFIGURATION.PATHS.ENTRIES, element: <Entries /> },
        { path: CONFIGURATION.PATHS.SETTINGS, element: <Settings /> },
        { path: CONFIGURATION.PATHS.TAGS, element: <Tags /> },
      ],
    },
  ],
  { basename: CONFIGURATION.BASENAME }
);
