import { AppShell, IconRocket } from "@timelet/ui";
import { IconBuilding } from "@timelet/ui";
import { IconReportAnalytics } from "@timelet/ui";
import { Divider, IconCategory, IconClock, IconSettings, IconTags, NavLink } from "@timelet/ui";
import { NavLink as RouterNavLink } from "react-router-dom";
import { CONFIGURATION } from "../../configuration";
import classes from "./DefaultNavigation.module.css";

export function DefaultNavigation() {
  return (
    <AppShell.Navbar className={classes.navbar}>
      <AppShell.Section grow p="xs">
        <RouterNavLink to={CONFIGURATION.PATHS.ENTRIES}>
          {({ isActive }) => <NavLink label="Entries" leftSection={<IconClock />} active={isActive} />}
        </RouterNavLink>
        <RouterNavLink to={CONFIGURATION.PATHS.CATEGORIES}>
          {({ isActive }) => <NavLink label="Categories" leftSection={<IconCategory />} active={isActive} />}
        </RouterNavLink>
        <RouterNavLink to={CONFIGURATION.PATHS.TAGS}>
          {({ isActive }) => <NavLink label="Tags" leftSection={<IconTags />} active={isActive} />}
        </RouterNavLink>
        <Divider label="Relationships" m="xs" />
        <NavLink label="Customers" leftSection={<IconBuilding />} />
        <NavLink label="Projects" leftSection={<IconRocket />} />
        <Divider label="Evaluation" m="xs" />
        <NavLink label="Reports" leftSection={<IconReportAnalytics />} />
      </AppShell.Section>
      <AppShell.Section p="xs">
        <RouterNavLink to={CONFIGURATION.PATHS.SETTINGS}>
          {({ isActive }) => <NavLink label="Settings" leftSection={<IconSettings />} active={isActive} />}
        </RouterNavLink>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
