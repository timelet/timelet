import { AppShell } from "@timelet/ui";
import { PropsWithChildren } from "react";
import { DefaultHeader } from "./default/DefaultHeader";

type DefaultLayoutProps = PropsWithChildren;

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <AppShell fixed={false} header={<DefaultHeader />}>
      {children}
    </AppShell>
  );
}
