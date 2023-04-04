import { IconRocket } from "@timelet/ui";
import { IconBuilding } from "@timelet/ui";
import { IconReportAnalytics } from "@timelet/ui";
import { Divider, IconCategory, IconClock, IconSettings, IconTags, NavLink, Navbar } from "@timelet/ui";

export function DefaultNavigation() {
  return (
    <Navbar width={{ base: 300 }}>
      <Navbar.Section grow p="xs">
        <NavLink label="Entries" icon={<IconClock />} />
        <NavLink label="Categories" icon={<IconCategory />} />
        <NavLink label="Tags" icon={<IconTags />} />
        <Divider label="Relationships" m="xs" />
        <NavLink label="Customers" icon={<IconBuilding />} />
        <NavLink label="Projects" icon={<IconRocket />} />
        <Divider label="Evaluation" m="xs" />
        <NavLink label="Reports" icon={<IconReportAnalytics />} />
      </Navbar.Section>
      <Navbar.Section p="xs">
        <NavLink label="Settings" icon={<IconSettings />} />
      </Navbar.Section>
    </Navbar>
  );
}
