// @flow
import R from 'ramda'

import { constructUserGroup } from '../../containers/UserGroup'

import type { UserGroups } from '../../containers/UserGroup'

export const getUserGroupsFromConfig = (
  userGroups: UserGroupsConfig = {},
): UserGroups =>
  R.reduce(
    (acc: UserGroups, key: string): UserGroups =>
      R.assoc(key, constructUserGroup(userGroups[key]), acc),
    {},
    R.keys(userGroups),
  )
