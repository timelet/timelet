import { usePageContext } from "../../renderer/contexts/usePageContext";
import { Data } from "./+data";
import { Features } from "./sections/Features";
import { Spotlight } from "./sections/Spotlight";

export function Page() {
  const context = usePageContext();
  const data = context.data as Data;
  return (
    <>
      <Spotlight />
      <Features features={data.features} />
    </>
  );
}
