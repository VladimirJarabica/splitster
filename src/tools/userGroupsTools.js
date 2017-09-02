// @flow
import R from 'ramda'
import type { UserGroup, UserGroupRule } from '../containers/UserGroup'
import type { UserGroupConfig, UserGroupSubConfig } from '../types/index'

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

export const getUserGroup = (userGroupConfig: UserGroupConfig): UserGroup => {
  if (typeof userGroupConfig === 'function') {
    return [userGroupConfig]
  }

  const userGroupSubConfigs: UserGroupSubConfig[] = Array.isArray(
    userGroupConfig,
  )
    ? userGroupConfig
    : [userGroupConfig]

  return R.map(getUserGroupRule, userGroupSubConfigs)
}

export const checkUserToUserGroup = (
  user: Object,
  userGroup: UserGroup,
): Boolean => R.allPass(userGroup)(user)
