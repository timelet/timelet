import { css, Theme, useTheme } from "@emotion/react";
import { MantineSize } from "@mantine/core";
import { ReactElement } from "react";

export type LinkListProps = {
  className?: string;
  links: {
    id: string;
    element: ReactElement;
  }[];
  orientation?: "vertical" | "horizontal";
  gap?: MantineSize;
};

const linkListStyles = (props: LinkListProps, theme: Theme) => css`
  ul {
    display: flex;
    flex-direction: ${props.orientation === "horizontal" ? "row" : "column"};
    list-style: none;
    padding: 0;
    margin: 0;
    gap: ${theme.spacing[props.gap ? props.gap : "xs"]};
  }
`;

export function LinkList(props: LinkListProps) {
  const theme = useTheme();
  return (
    <nav css={linkListStyles(props, theme)} className={props.className}>
      <ul>
        {props.links.map((link) => {
          return <li key={link.id}>{link.element}</li>;
        })}
      </ul>
    </nav>
  );
}
