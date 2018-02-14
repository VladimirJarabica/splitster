import checkUserToUserGroup from './checkUserToUserGroup'
import { getUserGroup } from './getUserGroup'

export const user = {
  name: 'John',
  age: 25,
}

// Mocks
export const mocks = [
  {
    config: u => u.name === 'John',
    user,
    result: true,
  },
  {
    config: {
      name: 'John',
    },
    user,
    result: true,
  },
  {
    config: [
      {
        name: ['John', 'Jack'],
      },
      _user => _user.age > 20 && _user.age < 30,
      {
        name: 'John',
      },
    ],
    user,
    result: true,
  },
]

describe('#userGroupsTools', () => {
  describe('#getUserGroup', () => {
    it('function config', () => {
      expect(
        checkUserToUserGroup(mocks[0].user, getUserGroup(mocks[0].config)),
      ).toEqual(mocks[0].result)
    })
    it('simple object config', () => {
      expect(
        checkUserToUserGroup(mocks[1].user, getUserGroup(mocks[1].config)),
      ).toEqual(mocks[1].result)
    })
    it('multiple rules config', () => {
      expect(
        checkUserToUserGroup(mocks[2].user, getUserGroup(mocks[2].config)),
      ).toEqual(mocks[2].result)
    })
  })
})
