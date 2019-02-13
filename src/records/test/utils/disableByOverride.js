import * as R from "ramda";

import checkDisabled from "./checkDisabled";

const disableByOverride = override => ([testId, test]) => {
  if (test.disabled) {
    return [testId, test];
  }
  return [testId, R.merge(test, checkDisabled(override[testId]))];
};

export default disableByOverride;
