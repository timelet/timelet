import { Configuration } from "./types";

const defaultConfiguration: Configuration = {
  renderPath: "./.timelet/content/",
};
let configuration: Configuration = defaultConfiguration;

export function validateConfiguration(configuration: Configuration) {
  if (configuration.defaultLocale && !configuration.locales) throw new Error("Locales not defined");
  if (!configuration.defaultLocale && configuration.locales) throw new Error("Default locale not defined");
  if (configuration.locales && !configuration.locales.find((l) => l.key === configuration.defaultLocale))
    throw new Error("Default locale not found in locales");
}

export function setConfiguration(newConfiguration: Configuration) {
  validateConfiguration(newConfiguration);
  configuration = { ...defaultConfiguration, ...newConfiguration };
}

export function getConfiguration() {
  return configuration;
}
