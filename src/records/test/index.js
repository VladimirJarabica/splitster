import * as R from "ramda";

import disableByDev from "./utils/disableByDev";
import disableByOverride from "./utils/disableByOverride";
import disableByConfig from "./utils/disableByConfig";
import disableByUserGroups from "./utils/disableByUserGroups";
import disableByUsage from "./utils/disableByUsage";
import setWinningVariant from "./utils/setWinningVariant";

// 1. disable by dev (developer specified it in override)
// 2. disable by config (test configuration contains `disabled: true`)
// 3. disable by previous disable (override is `__disabled_reason`)
// 4. disable by user group (user is not in some of the user group)
// 5. disable by user group exclude (user is in some if the exclusion user group)
// 6. disable by usage if override does not already have value (random)
// 7. set value if not disabled (if not disabled, based on user id set value)
export const getTestFromConfig = ({ override, user, userId }) =>
  R.compose(
    setWinningVariant(userId),
    disableByUsage(override),
    disableByUserGroups(user, override, true), // user group exclude
    disableByUserGroups(user, override),
    // disableByDeadline,
    disableByConfig,
    disableByOverride(override),
    disableByDev(override)
  );

export const getTestsFromConfig = (tests, opts) =>
  R.compose(
    R.fromPairs,
    R.map(getTestFromConfig(opts)),
    R.toPairs
  )(tests);
