import { AppShell } from "@timelet/ui";
import { Outlet } from "react-router-dom";
import { DefaultFooter } from "./default/DefaultFooter";
import DefaultHeader from "./default/DefaultHeader";
import { DefaultNavigation } from "./default/DefaultNavigation";
import { ReloadPrompt } from "../components/ReloadPrompt";

export function DefaultLayout() {
  return (
    <AppShell header={{ height: 64 }} footer={{ height: 48 }} navbar={{ width: 300, breakpoint: "sm" }}>
      <DefaultHeader />
      <DefaultNavigation />
      <Outlet />
      <ReloadPrompt />
      <DefaultFooter />
    </AppShell>
  );
}
