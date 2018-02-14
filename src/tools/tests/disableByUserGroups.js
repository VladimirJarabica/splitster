// @flow
import R from 'ramda'

import { testDefProperlySet } from './testsTools'
import { checkUserToUserGroup, getUserGroup } from '../userGroupsTools'

import type { TestsConfig, TestUserGroupConfig } from '../../types/index'
import type { UserGroups } from '../../containers/UserGroup'

export const passTestUserGroups = (
  testUserGroup: TestUserGroupConfig = '',
  userGroups: UserGroups,
  user: Object,
): boolean => {
  if (R.isEmpty(testUserGroup)) return true

  if (Array.isArray(testUserGroup)) {
    return R.allPass(
      R.map(
        (_testUserGroup: TestUserGroupConfig) =>
          R.partial(passTestUserGroups, [_testUserGroup, userGroups]),
        testUserGroup,
      ),
    )(user)
  }

  if (typeof testUserGroup === 'string') {
    return checkUserToUserGroup(user, userGroups[testUserGroup])
  }

  return checkUserToUserGroup(user, getUserGroup(testUserGroup))
}

const disableByUserGroups = (
  userGroups: ?UserGroups,
  user: ?Object,
  def: ?SaveResults = {},
) => (tests: TestsConfig): TestsConfig => {
  if (!user || R.isEmpty(user)) {
    return tests
  }
  return R.mapObjIndexed((test: TestConfig, testId: TestId) => {
    if (testDefProperlySet(testId, def) || test.disabled) {
      return test
    }

    const disabledByUserGroups = R.not(
      passTestUserGroups(test.userGroup, userGroups || {}, user || {}),
    )
    return R.compose(
      R.assoc('disabledReason', disabledByUserGroups ? 'user_group' : null),
      R.assoc('disabled', disabledByUserGroups),
    )(test)
  }, tests)
}

export default disableByUserGroups
