import { Footer } from "@timelet/ui";
import { FormattedMessage } from "react-intl";
import { CONFIGURATION } from "../../configuration";

export function DefaultFooter() {
  return (
    <Footer height={48}>
      <FormattedMessage id="layout.footer.version" values={{ version: CONFIGURATION.VERSION }} />
    </Footer>
  );
}
