import { Configuration } from "./types";

const defaultConfiguration: Configuration = {
  outputPath: "./.timelet/content/",
};
let configuration: Configuration = defaultConfiguration;

export function validateConfiguration(configuration: Configuration) {
  if (configuration.i18n && configuration.i18n.locales && !configuration.i18n.locales.find((l) => l.key === configuration.i18n?.defaultLocale))
    throw new Error("Default locale not found in locales");
}

export function setConfiguration(newConfiguration: Configuration) {
  validateConfiguration(newConfiguration);
  configuration = newConfiguration;
}

export function getConfiguration() {
  return configuration;
}
