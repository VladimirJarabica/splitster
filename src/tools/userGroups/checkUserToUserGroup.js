// @flow
import R from 'ramda'
import type { UserGroup } from '../../containers/UserGroup'

const checkUserToUserGroup = (user: Object, userGroup: UserGroup): boolean =>
  R.allPass(userGroup)(user)

export default checkUserToUserGroup
