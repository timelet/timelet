import { css } from "@emotion/react";
import { Logo } from "./Logo";

const brandStyles = css`
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: bold;

  svg {
    height: 100%;
    width: auto;
  }
`;

export type BrandProps = {
  className?: string;
};

export function Brand({ className }: BrandProps) {
  return (
    <div css={brandStyles} className={className}>
      <Logo />
      <span>Timelet</span>
    </div>
  );
}
