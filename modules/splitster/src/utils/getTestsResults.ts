import * as R from "ramda";

import { Config } from "../records/Config";
import { getTestResult, TestResult } from "./getTestResult";

export interface TestsResults {
  [id: string]: TestResult;
}
export const getTestsResults = (
  config: Config,
  user: any,
  userId: string,
  override: { [testId: string]: string } = {}
) => {
  const entries = Object.entries(config.tests);
  const resultsEntries: [string, TestResult][] = entries.map(
    ([id, testConfig]) => [
      id,
      getTestResult({ testConfig, user, userId, override })
    ]
  );

  return R.fromPairs<TestResult>(resultsEntries);
};
