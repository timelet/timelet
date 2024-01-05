import { Logo } from "./Logo";
import classes from "./Brand.module.css";

export type BrandProps = {
  className?: string;
};

export function Brand({ className }: BrandProps) {
  return (
    <div className={`${classes.brand} ${className}`}>
      <Logo />
      <span>Timelet</span>
    </div>
  );
}
