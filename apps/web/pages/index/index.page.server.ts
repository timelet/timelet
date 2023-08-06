import { getFeatures } from "../../data/features";

export async function onBeforeRender() {
  const features = await getFeatures();

  return { pageContext: { pageProps: { features } } };
}
