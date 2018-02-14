// @flow
import R from 'ramda'

import { getUserGroupRule } from './getUserGroupRule'

import type { UserGroupConfig, UserGroupSubConfig } from '../../types/index'
import type { UserGroup } from '../../containers/UserGroup'

const getUserGroup = (userGroupConfig: UserGroupConfig): UserGroup => {
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

export default getUserGroup
