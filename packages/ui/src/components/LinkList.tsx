import { MantineSize, useMantineTheme } from "@mantine/core";
import { ReactElement } from "react";
import classes from "./LinkList.module.css";

export type LinkListProps = {
  className?: string;
  links: {
    id: string;
    element: ReactElement;
  }[];
  direction?: "row" | "column";
  gap?: MantineSize;
};

export function LinkList({ className, links, ...rest }: LinkListProps) {
  const theme = useMantineTheme();
  const variables = {
    "--direction": rest.direction ?? "row",
    "--gap": rest.gap ? theme.spacing[rest.gap] : theme.spacing.xs,
  };
  return (
    <nav className={`${classes.linkList} ${className}`} style={variables}>
      <ul>
        {links.map((link) => {
          return <li key={link.id}>{link.element}</li>;
        })}
      </ul>
    </nav>
  );
}
