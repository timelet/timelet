import { Divider, IconCategory, IconClock, IconTags, NavLink, Navbar } from "@timelet/ui";

export function DefaultNavigation() {
  return (
    <Navbar width={{ base: 300 }}>
      <Navbar.Section grow p="xs">
        <NavLink label="Entries" icon={<IconClock />} />
        <NavLink label="Categories" icon={<IconCategory />} />
        <NavLink label="Tags" icon={<IconTags />} />
        <Divider label="Evaluation" m="xs" />
        <NavLink label="Tags" icon={<IconTags />} />
      </Navbar.Section>
    </Navbar>
  );
}
