// @flow
import type { UserGroupConfig } from '../types'
import getUserGroup from '../tools/userGroups/getUserGroup'

export type UserGroupRule = Object => boolean
export type UserGroup = UserGroupRule[]

export type UserGroups = { [string]: UserGroup }

// TODO: do UserGroup
export const constructUserGroup = (
  userGroupConfig: UserGroupConfig,
): UserGroup => {
  return getUserGroup(userGroupConfig)
}
