import { PropsWithChildren } from "react";
import { usePageContext } from "../contexts/usePageContext";
import { Anchor } from "@timelet/ui";
import { createLocalePath, replaceSegments } from "../utils/path";

type LinkProps = {
  href?: string;
  className?: string;
  localize?: boolean;
};

export function Link(props: PropsWithChildren<LinkProps>) {
  const pageContext = usePageContext();
  const className = [props.className, pageContext.urlPathname === props.href && "is-active"].filter(Boolean).join(" ");
  const localize = props.localize ?? true;

  let href = props.href || "";

  if (localize) {
    href = createLocalePath(href, pageContext.locale);
    href = replaceSegments(href, pageContext.locale?.routes);
  }

  return <Anchor {...props} href={href} className={className} {...(className.includes("Button") && { "data-underline": "never" })} />;
}
