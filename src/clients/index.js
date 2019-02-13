import * as R from "ramda";

import { getTestsFromConfig } from "../records/test";

/**
 * Splitster client class abstraction
 * containing all the common methods
 */
class SplitsterClient {
  // Config
  tests = {};
  options = {};

  // Live data
  user = "";
  userId = "";

  constructor({ config, user, userId, override = {} }, copy) {
    if (!config && !user && !userId && copy) {
      // Create new one from copy
      console.log("copy", copy);
      this.tests = copy.tests;
      this.options = copy.options;
      this.user = copy.user;
      this.results = copy.results;
      return;
    }

    // Initialize splitster

    // Set user
    this.user = user;
    this.userId = userId;
    // Set options
    this.options = config.options;

    this.tests = getTestsFromConfig(config.tests, { override, user, userId });
  }

  getSaveResults = (includeVersions? = false) =>
    R.compose(
      R.fromPairs,
      R.map(([testId, test]) => [
        includeVersions ? `${testId}_${test.version}` : testId,
        R.prop("winningVariant", test)
      ]),
      R.toPairs
    )(this.tests);

  get = testId => {
    if (!R.has(testId, this.tests)) {
      console.warn(
        `Splitster: Trying to access not existing test: ${testId}, your value will be null.`
      );
      return { value: null };
    }
    return { value: this.tests[testId].winningVariant };
  };

  set = (testId, variantId) => {
    console.log("parent set");
    return new this.constructor(
      {},
      {
        tests: this.tests,
        options: this.options,
        user: this.user,
        results: R.assocPath([testId, "winningVariant"], variantId, this.tests)
      }
    );
  };
}

export default SplitsterClient;
