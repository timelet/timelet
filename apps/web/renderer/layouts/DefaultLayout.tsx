import { AppShell } from "@timelet/ui";
import { PropsWithChildren } from "react";
import { DefaultFooter } from "./default/DefaultFooter";
import { DefaultHeader } from "./default/DefaultHeader";

type DefaultLayoutProps = PropsWithChildren;

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <AppShell padding={0} header={{ height: 64 }} footer={{ height: 36 }}>
      <DefaultHeader />
      <AppShell.Main>{children}</AppShell.Main>
      <DefaultFooter />
    </AppShell>
  );
}
