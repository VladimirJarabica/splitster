import { InputConfig, Config, getConfig } from "../records/Config";
import { getTestsResults, TestsResults } from "../utils/getTestsResults";
import { TestResult } from "../utils/getTestResult";

export interface ConstructorInput {
  isSimple?: boolean;
  config: InputConfig;
  user?: any;
  userId: string;
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
    userId
  }: ConstructorInput) {
    const realConfig = getConfig(config);
    if (!isSimple) {
      this.config = realConfig;
      this.user = user;
      this.userId = userId;
    }
    this.results = getTestsResults(realConfig, userId);
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
}
