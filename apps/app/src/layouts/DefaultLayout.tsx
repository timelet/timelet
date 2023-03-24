import { AppShell } from "@timelet/ui";
import { Outlet } from "react-router-dom";
import { DefaultFooter } from "./default/DefaultFooter";
import DefaultHeader from "./default/DefaultHeader";

export function DefaultLayout() {
  return (
    <AppShell header={<DefaultHeader />} footer={<DefaultFooter />}>
      <Outlet />
    </AppShell>
  );
}
