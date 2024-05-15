import { IconLanguage, Menu } from "@timelet/ui";
import { Button } from "@timelet/ui";
import { AvailableLocales } from "../../types";
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
            <Link href={l.path} localize={false}>
              {l.locale.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
