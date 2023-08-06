import { Card, Group, Spoiler, Text, Title } from "@timelet/ui";
import { FeaturesType } from "../../../data/features";
import { Theme, css } from "@emotion/react";

const featuresStyles = (theme: Theme) => css`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

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
        <Card component="article" key={f.id} withBorder>
          <Group py={20}>
            <Title order={2}>{f.title}</Title>
          </Group>
          <Group>
            <Spoiler maxHeight={76} showLabel="More" hideLabel="Less">
              <Text>{f.description}</Text>
            </Spoiler>
          </Group>
        </Card>
      ))}
    </section>
  );
}
