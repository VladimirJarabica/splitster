import disableByUserGroups, { passTestUserGroups } from './disableByUserGroups'
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

  describe('#passTestUserGroups', () => {
    it('simple string reference to group', () => {
      expect(passTestUserGroups('isWise', userGroups, tyrion)).toEqual(true)
      expect(passTestUserGroups('notWise', userGroups, tyrion)).toEqual(false)
    })
    it('array string reference to group', () => {
      expect(
        passTestUserGroups(['isWise', 'maybeWise'], userGroups, tyrion),
      ).toEqual(true)
      expect(
        passTestUserGroups(
          ['isWise', 'maybeWise', 'notWise'],
          userGroups,
          tyrion,
        ),
      ).toEqual(false)
      expect(
        passTestUserGroups(
          ['isWise', ['isWise', 'maybeWise']],
          userGroups,
          tyrion,
        ),
      ).toEqual(true)
      expect(
        passTestUserGroups(
          ['isWise', ['isWise', 'notWise', 'maybeWise']],
          userGroups,
          tyrion,
        ),
      ).toEqual(false)
    })
    it('custom test user group config', () => {
      expect(
        passTestUserGroups(user => user.name === 'Tyrion', null, tyrion),
      ).toEqual(true)
      expect(
        passTestUserGroups(
          [user => user.name === 'Tyrion', { height: 130 }],
          null,
          tyrion,
        ),
      ).toEqual(true)
      expect(
        passTestUserGroups(
          [user => user.name === 'Tyrion', { height: 100 }],
          null,
          tyrion,
        ),
      ).toEqual(false)
    })
  })
})
