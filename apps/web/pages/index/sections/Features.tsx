import { Card, Group, Spoiler, Text } from "@timelet/ui";
import { FeaturesType } from "../../../data/features";
import { Theme, css } from "@emotion/react";

const featuresStyles = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: ${theme.breakpoints.xl}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

type FeaturesProps = {
  features: FeaturesType["features"];
};

export function Features({ features }: FeaturesProps) {
  return (
    <section css={featuresStyles}>
      {features.map((f) => (
        <Card component="article" key={f.id}>
          <Card.Section>
            <h3>{f.title}</h3>
          </Card.Section>
          <Group>
            <Spoiler maxHeight={72} showLabel="More" hideLabel="Less">
              <Text>{f.description}</Text>
            </Spoiler>
          </Group>
        </Card>
      ))}
    </section>
  );
}
