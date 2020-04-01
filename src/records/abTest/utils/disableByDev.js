import * as R from "ramda";

const disableByDev = override => ([testId, test]) => {
  if (override[testId] && override[testId] === "__disabled_dev") {
    return [
      testId,
      R.merge(test, {
        disabled: true,
        disabledReason: "dev"
      })
    ];
  }
  return [testId, test];
};

export default disableByDev;
