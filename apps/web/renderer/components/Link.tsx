import { PropsWithChildren } from "react";
import { usePageContext } from "../contexts/usePageContext";
import { Anchor } from "@timelet/ui";

type LinkProps = {
  href?: string;
  className?: string;
};

export function Link(props: PropsWithChildren<LinkProps>) {
  const pageContext = usePageContext();
  const className = [props.className, pageContext.urlPathname === props.href && "is-active"].filter(Boolean).join(" ");
  return <Anchor {...props} className={className} {...(className.includes("Button") && { "data-underline": "never" })} />;
}
