import { TestConfig, InputTestConfig, getTestConfig } from "./TestConfig";
import { getSafe } from "../utils/getSafe";

export interface InputConfig {
  tests: { [id: string]: InputTestConfig };
  options?: {
    cookies?: {
      disabled?: boolean;
      expiration?: number;
      name?: string;
    };
  };
}

export interface Config {
  tests: { [id: string]: TestConfig };
  options: {
    cookies: {
      disabled: boolean;
      expiration: number;
      name: string;
    };
  };
}

export const getTestsConfig = (configTests: {
  [id: string]: InputTestConfig;
}): { [id: string]: TestConfig } => {
  const entries = Object.entries(configTests);
  const mapped: [string, TestConfig][] = entries.map(
    ([id, inputTestConfig]) => [id, getTestConfig(id, inputTestConfig)]
  );
  return Object.fromEntries<TestConfig>(mapped);
};

export const getConfig = (inputConfig: InputConfig): Config => {
  const config: Config = {
    tests: getTestsConfig(inputConfig.tests),
    options: {
      cookies: {
        disabled:
          getSafe<boolean>(() => inputConfig.options.cookies.disabled) || false,
        expiration:
          getSafe<number>(() => inputConfig.options.cookies.expiration) || 30, // TODO: check if it is alright
        name:
          getSafe<string>(() => inputConfig.options.cookies.name) || "splitster"
      }
    }
  };
  return config;
};
