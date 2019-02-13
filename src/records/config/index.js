import * as R from "ramda";

const defaultConfig = {
  tests: {},
  options: {
    cookies: {
      disabled: false,
      expiration: 30, // TODO: check if it is alright
      name: "splitster"
    }
  }
};

const defaultTestConfig = {
  description: "",
  userGroup: {},
  userGroupExclude: {},
  usage: 100,
  defaultVariant: "",
  variants: {},
  disabled: false,
  disabledReason: null,
  version: 0
};

export const mergeTestConfig = R.mergeDeepRight(defaultTestConfig);

export const mergeDefaultConfig = config => {
  const merged = R.compose(
    c => R.assoc("tests", R.map(mergeTestConfig, config.tests), c),
    R.mergeDeepRight(defaultConfig)
  )(config);
  return merged;
};
