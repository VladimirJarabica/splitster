import * as R from "ramda";

const disableByConfig = ([testId, test]) => {
  if (test.disabled && !test.disabledReason) {
    return [
      testId,
      R.merge(test, {
        disabled: true,
        disabledReason: "config"
      })
    ];
  }
  return [testId, test];
};

export default disableByConfig;
