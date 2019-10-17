import * as seedRandom from "seedrandom";
import { integer as randomInteger, nativeMath } from "random-js";

import { getWinningVariant } from "./getWinningVariant";

import { TestConfig } from "../records/TestConfig";

export const getSeedNumber = (key: string): number => seedRandom(key)();

export interface TestResult {
  disabled: boolean;
  disabledReason: string | null;
  value: string;
}

interface Input {
  testConfig: TestConfig;
  userId: string;
  override?: { [testAndVersion: string]: string };
}

const getOverride = (
  testConfig: TestConfig,
  override: { [testAndVersion: string]: string }
): string | null => {
  if (override[`${testConfig.id}_${testConfig.version}`]) {
    return override[`${testConfig.id}_${testConfig.version}`];
  }

  if (override[testConfig.id]) {
    return override[testConfig.id];
  }
  return null;
};

const DISABLED_REGEX = /^(__disabled_)(\w+)$/;

export const getTestResult = ({
  testConfig,
  userId,
  override = {}
}: Input): TestResult => {
  const overrideValue = getOverride(testConfig, override);
  if (overrideValue) {
    const regexResult = overrideValue.match(DISABLED_REGEX);
    if (regexResult && regexResult[1] === "__disabled") {
      return {
        disabled: true,
        disabledReason: regexResult[2],
        value: testConfig.defaultVariant
      };
    }
  }

  if (testConfig.disabled) {
    return {
      disabled: true,
      disabledReason: "dev",
      value: testConfig.defaultVariant
    };
  }

  // TODO: user groups

  if (testConfig.usage !== null) {
    const rand = randomInteger(0, 99)(nativeMath);
    if (rand >= testConfig.usage) {
      return {
        disabled: true,
        disabledReason: "usage",
        value: testConfig.defaultVariant
      };
    }
  }

  const seedNumber = getSeedNumber(
    `${testConfig.id}_${testConfig.version}:${userId}`
  );

  return {
    disabled: false,
    disabledReason: null,
    value: getWinningVariant(testConfig, seedNumber)
  };
};
