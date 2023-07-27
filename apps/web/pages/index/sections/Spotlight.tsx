import { Theme, css } from "@emotion/react";
import { Button, Group, IconArrowRight, Logo, Title } from "@timelet/ui";
import { TypeAnimation } from "react-type-animation";
import { Link } from "../../../renderer/components/Link";
import { CONFIGURATION } from "../../../renderer/configuration";
import { FormattedMessage } from "react-intl";

const spotlightStyles = (theme: Theme) => css`
  overflow: auto;
  min-height: 45rem;
  background-size: 100% 100%;
  background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
  background-image: radial-gradient(60% 38% at 50% 55%, #ffffff59 0%, #073aff00 100%),
    radial-gradient(49% 81% at 45% 47%, #ffe20345 0%, #073aff00 100%), radial-gradient(113% 91% at -17% 5%, #ff5722 1%, #ff000000 99%),
    radial-gradient(142% 91% at 83% 7%, #ffdb00ff 1%, #ff000000 99%), radial-gradient(142% 91% at 111% 84%, #ffd7cc 0%, #cc441b 100%);
  color: ${theme.white};
  display: flex;
  align-items: center;
  gap: 4rem;
  text-shadow: 0 2px 5px #0003;

  h1 {
    font-size: 2.4rem;
  }

  h1 + p {
    font-size: 1.4rem;
  }
`;

export function Spotlight() {
  return (
    <section css={spotlightStyles}>
      <div>
        <Title>
          <TypeAnimation
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
        <Group spacing="sm">
          <Button component={Link} href={CONFIGURATION.PATHS.APP}>
            <FormattedMessage id="actions.recordTime" />
          </Button>
          <Button variant="subtle">
            Learn more <IconArrowRight />
          </Button>
        </Group>
      </div>
      <div>
        <Logo />
      </div>
    </section>
  );
}
