import { Button, Group, IconArrowRight, Logo, Title } from "@timelet/ui";
import { TypeAnimation } from "react-type-animation";
import { Link } from "../../../renderer/components/Link";
import { CONFIGURATION } from "../../../renderer/configuration";
import { FormattedMessage } from "react-intl";
import classes from "./Spotlight.module.css";

export function Spotlight() {
  return (
    <section className={classes.spotlight}>
      <div>
        <Title>
          <TypeAnimation
            role="marquee"
            aria-label="Offline first, privacy respecting, distributed, free and open-source "
            sequence={["Offline first", 2500, "Privacy respecting", 2500, "Distributed and serverless", 2500, "Free and open-source", 2500]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
          <br />
          time tracking app
        </Title>
        <p>Timelet helps you keeping track of your time investments.</p>
        <Group gap="sm">
          <Button component={Link} href={CONFIGURATION.PATHS.APP}>
            <FormattedMessage id="actions.recordTime" />
          </Button>
          <Button variant="subtle" component={Link} href={CONFIGURATION.PATHS.DOCS}>
            <Group gap="xs">
              Getting started guide <IconArrowRight />
            </Group>
          </Button>
        </Group>
      </div>
      <div id="spotlight-show">
        <Logo />
      </div>
    </section>
  );
}
