import { FeaturesType } from "../../../data/features";

type FeaturesProps = {
  features: FeaturesType["features"];
};

export function Features({ features }: FeaturesProps) {
  return (
    <section>
      {features.map((f) => (
        <article key={f.id}>
          <header>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </header>
        </article>
      ))}
    </section>
  );
}
