import { AppShell } from "@timelet/ui";
import { PropsWithChildren } from "react";
import DefaultHeader from "./DefaultHeader";

type DefaultLayoutProps = PropsWithChildren;

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return <AppShell header={<DefaultHeader />}>{children}</AppShell>;
}
