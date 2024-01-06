import { Card, Group, Spoiler, Text, Title } from "@timelet/ui";
import { FeaturesType } from "../../../data/features";
import classes from "./Features.module.css";

type FeaturesProps = {
  features: FeaturesType["features"];
};

export function Features({ features }: FeaturesProps) {
  return (
    <section className={classes.features}>
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
