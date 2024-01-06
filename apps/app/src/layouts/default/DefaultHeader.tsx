import { Brand, AppShell } from "@timelet/ui";
import { NavLink } from "react-router-dom";
import { CONFIGURATION } from "../../configuration";
import classes from "./DefaultHeader.module.css";

export default function DefaultHeader() {
  return (
    <AppShell.Header p="xs" className={classes.header}>
      <NavLink to={CONFIGURATION.PATHS.DASHBOARD}>
        <Brand />
      </NavLink>
    </AppShell.Header>
  );
}
