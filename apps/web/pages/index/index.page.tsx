import { FeaturesType } from "../../data/features";
import { Features } from "./sections/Features";
import { Spotlight } from "./sections/Spotlight";

export const documentProps = {
  slug: "start",
};

type PageProps = {
  features: FeaturesType;
};

export function Page(pageProps: PageProps) {
  return (
    <>
      <Spotlight />
      <Features features={pageProps.features.features} />
    </>
  );
}
