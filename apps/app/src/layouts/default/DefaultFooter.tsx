import { Footer } from "@timelet/ui";
import { CONFIGURATION } from "../../configuration";

export function DefaultFooter() {
  return <Footer height={48}>{CONFIGURATION.VERSION}</Footer>;
}
