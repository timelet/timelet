import { IconRocket } from "@timelet/ui";
import { IconBuilding } from "@timelet/ui";
import { IconReportAnalytics } from "@timelet/ui";
import { Divider, IconCategory, IconClock, IconSettings, IconTags, NavLink, Navbar } from "@timelet/ui";
import { NavLink as RouterNavLink } from "react-router-dom";
import { CONFIGURATION } from "../../configuration";
import { css } from "@emotion/react";

const defaultNavigationStyles = css`
  a {
    text-decoration: none;
  }
`;

export function DefaultNavigation() {
  return (
    <Navbar width={{ base: 300 }} css={defaultNavigationStyles}>
      <Navbar.Section grow p="xs">
        <RouterNavLink to={CONFIGURATION.PATHS.ENTRIES}>
          {({ isActive }) => <NavLink label="Entries" icon={<IconClock />} active={isActive} />}
        </RouterNavLink>
        <RouterNavLink to={CONFIGURATION.PATHS.CATEGORIES}>
          {({ isActive }) => <NavLink label="Categories" icon={<IconCategory />} active={isActive} />}
        </RouterNavLink>
        <RouterNavLink to={CONFIGURATION.PATHS.TAGS}>
          {({ isActive }) => <NavLink label="Tags" icon={<IconTags />} active={isActive} />}
        </RouterNavLink>
        <Divider label="Relationships" m="xs" />
        <NavLink label="Customers" icon={<IconBuilding />} />
        <NavLink label="Projects" icon={<IconRocket />} />
        <Divider label="Evaluation" m="xs" />
        <NavLink label="Reports" icon={<IconReportAnalytics />} />
      </Navbar.Section>
      <Navbar.Section p="xs">
        <RouterNavLink to={CONFIGURATION.PATHS.SETTINGS}>
          {({ isActive }) => <NavLink label="Settings" icon={<IconSettings />} active={isActive} />}
        </RouterNavLink>
      </Navbar.Section>
    </Navbar>
  );
}
