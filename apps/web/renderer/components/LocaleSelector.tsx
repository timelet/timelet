import { IconLanguage, Menu } from "@timelet/ui";
import { AvailableLocales } from "../../types";
import { Button } from "@timelet/ui";
import { Link } from "./Link";

type LocaleSelectorProps = {
  availableLocales: AvailableLocales;
};

export function LocaleSelector(props: LocaleSelectorProps) {
  if (props.availableLocales.length === 0) {
    return null;
  }

  return (
    <Menu withinPortal={false}>
      <Menu.Target>
        <Button variant="transparent">
          <IconLanguage size="1.2rem" />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {props.availableLocales.map((l) => (
          <Menu.Item key={l.path}>
            <Link href={l.path}>{l.locale.name}</Link>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
