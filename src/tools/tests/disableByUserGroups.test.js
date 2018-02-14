import disableByUserGroups from './disableByUserGroups'
import {
  userGroups,
  tyrion,
  testsConfig,
  mapDisabledProp,
  mapDisabledReasonProp,
} from './testsTools.test'

describe('#disableByUserGroups', () => {
  it('should correctly disable', () => {
    expect(
      mapDisabledProp(disableByUserGroups(userGroups, tyrion)(testsConfig)),
    ).toEqual([false, true, false])
    expect(
      mapDisabledReasonProp(
        disableByUserGroups(userGroups, tyrion)(testsConfig),
      ),
    ).toEqual([null, 'user_group', null])
  })
})
