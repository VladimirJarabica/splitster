// @flow
import R from 'ramda'

import type { UserGroupSubConfig } from '../../types/index'
import type { UserGroupRule } from '../../containers/UserGroup'

export const getUserGroupRule = (
  userGroupSubConfig: UserGroupSubConfig,
): UserGroupRule => {
  if (typeof userGroupSubConfig === 'function') return userGroupSubConfig
  // { key: "string", key: ["string", "string"]}
  const rules = R.map(
    (key: string) => (user: Object) => {
      const allowedValues = Array.isArray(userGroupSubConfig[key])
        ? userGroupSubConfig[key]
        : [userGroupSubConfig[key]]

      return R.contains(R.prop(key, user), allowedValues)
    },
    R.keys(userGroupSubConfig),
  )
  return R.allPass(rules)
}
