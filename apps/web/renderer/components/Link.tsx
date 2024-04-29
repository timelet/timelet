import React from "react";
import { usePageContext } from "../contexts/usePageContext";
import { Anchor } from "@timelet/ui";

export function Link(props: { href?: string; className?: string; children: React.ReactNode }) {
  const pageContext = usePageContext();
  const className = [props.className, pageContext.urlPathname === props.href && "is-active"].filter(Boolean).join(" ");
  return <Anchor {...props} className={className} {...(className.includes("Button") && { "data-underline": "never" })} />;
}
