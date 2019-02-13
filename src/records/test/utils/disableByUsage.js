import * as R from "ramda";
import Random from "random-js";

import testOverridePersistance from "./testOverridePersistance";

const disableByUsage = (override, testRandom) => ([testId, test]) => {
  if (
    test.disabled ||
    testOverridePersistance(testId, override) ||
    R.isNil(test.usage)
  ) {
    return [testId, test];
  }

  const rand = testRandom || Random.integer(0, 99)(Random.engines.nativeMath);
  if (rand >= test.usage) {
    return [
      testId,
      R.merge(test, {
        disabled: true,
        disabledReason: "usage"
      })
    ];
  }
  return [testId, test];
};

export default disableByUsage;
