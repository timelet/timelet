import { PropsWithChildren } from "react";

type DefaultLayoutProps = PropsWithChildren;

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return <div>{children}</div>;
}
