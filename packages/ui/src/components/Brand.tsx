import { Logo } from "./Logo";
import classes from "./Brand.module.css";

export type BrandProps = {
  className?: string;
};

export function Brand(props: BrandProps) {
  return (
    <div {...props} className={`${classes.brand} ${props.className}`}>
      <Logo />
      <span>Timelet</span>
    </div>
  );
}
