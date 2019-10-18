import * as R from "ramda";

import { TestConfig, InputTestConfig, getTestConfig } from "./TestConfig";

export interface InputConfig {
  tests: { [id: string]: InputTestConfig };
}

export interface Config {
  tests: { [id: string]: TestConfig };
}

export const getTestsConfig = (configTests: {
  [id: string]: InputTestConfig;
}): { [id: string]: TestConfig } => {
  const entries = Object.entries(configTests);
  const mapped: [string, TestConfig][] = entries.map(
    ([id, inputTestConfig]) => [id, getTestConfig(id, inputTestConfig)]
  );
  return R.fromPairs<TestConfig>(mapped);
};

export const getConfig = (inputConfig: InputConfig): Config => {
  const config: Config = {
    tests: getTestsConfig(inputConfig.tests)
  };
  return config;
};
