import * as R from "ramda";

import { InputConfig, Config, getConfig } from "../records/Config";
import { getTestsResults, TestsResults } from "../utils/getTestsResults";
import { TestResult } from "../utils/getTestResult";

export type Override = {
  [testId: string]: string;
};

export interface ConstructorInput {
  isSimple?: boolean;
  config: InputConfig;
  user?: any;
  userId: string;
  override?: Override;
}

export class SplitsterClient {
  results: TestsResults = {};

  config: Config | null = null;

  user: any | null = null;

  userId: string | null = null;

  constructor({
    isSimple = true,
    config,
    user = {},
    userId,
    override = {}
  }: ConstructorInput) {
    const realConfig = getConfig(config);
    if (!isSimple) {
      this.config = realConfig;
      this.user = user;
      this.userId = userId;
    }
    this.results = getTestsResults(realConfig, user, userId, override);
  }

  get(testId: string): TestResult {
    if (!this.results[testId]) {
      console.warn(
        `Splitster: Trying to access not existing test: ${testId}, your value will be null.`
      );
      return { disabled: false, disabledReason: null, value: null };
    }
    return this.results[testId];
  }

  set(testId: string, variant: string): void {
    if (this.results[testId]) {
      this.results[testId].value = variant;
    }
  }

  getSaveResults(): { [id: string]: string } {
    const resultsEntries = Object.entries(this.results);
    const mapped: [string, string][] = resultsEntries.map(
      ([id, resultEntry]) => [
        id,
        resultEntry.disabled
          ? `__disabled_${resultEntry.disabledReason}`
          : resultEntry.value
      ]
    );
    return R.fromPairs(mapped);
  }

  clone(): SplitsterClient {
    const copy = Object.create(Object.getPrototypeOf(this));
    copy.results = R.clone(this.results);
    copy.config = R.clone(this.config);
    copy.user = R.clone(this.user);
    copy.userId = this.userId;
    return copy;
  }
}
