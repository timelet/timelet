import { AppShell } from "@timelet/ui";
import { Outlet } from "react-router-dom";
import DefaultHeader from "./default/DefaultHeader";

export function DefaultLayout() {
  return (
    <AppShell header={<DefaultHeader />}>
      <Outlet />
    </AppShell>
  );
}
