import { Global } from "@timelet/ui";

export function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        "header, section": {
          paddingLeft: "20%",
          paddingRight: "20%",
        },
      })}
    />
  );
}
