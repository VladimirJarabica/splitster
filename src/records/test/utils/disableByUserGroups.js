import * as R from 'ramda';

import testOverridePersistance from './testOverridePersistance';
import passTestUserGroups from './passTestUserGroups';

const getDisabledReason = exclude =>
  exclude ? 'user_group_exclude' : 'user_group';

const disableByUserGroups = (user, override, exclude = false) => {
  if (!user) return R.identity;

  const checker = exclude ? R.identity : R.not;

  return ([testId, test]) => {
    const userGroup = exclude ? test.userGroupExclude : test.userGroup;

    if (
      test.disabled ||
      testOverridePersistance(testId, test.version, override) ||
      R.isEmpty(userGroup)
    ) {
      return [testId, test];
    }

    const disabledByUserGroups = checker(
      passTestUserGroups(userGroup, user || {}),
    );

    return [
      testId,
      R.compose(
        R.assoc(
          'disabledReason',
          disabledByUserGroups ? getDisabledReason(exclude) : null,
        ),
        R.assoc('disabled', disabledByUserGroups),
      )(test),
    ];
  };
};

export default disableByUserGroups;
