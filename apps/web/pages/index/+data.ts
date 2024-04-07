import { getFeatures } from "../../data/features";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const features = await getFeatures();
  return {
    features,
  };
}
