// @flow
import {
  getUserGroupRule,
  getUserGroup,
  checkUserToUserGroup,
} from './userGroupsTools'

const user = {
  name: 'John',
  age: 25,
}

// Mocks
const mocks = [
  {
    config: user => user.name === 'John',
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
  describe('#userGroupRule', () => {
    it('function config', () => {
      expect(getUserGroupRule(user => user.name === 'John')(user)).toEqual(true)
    })
    it('object config', () => {
      expect(getUserGroupRule({ name: 'John' })(user)).toEqual(true)
      expect(getUserGroupRule({ name: 'Jack' })(user)).toEqual(false)
      expect(getUserGroupRule({ name: ['Jack', 'John'] })(user)).toEqual(true)
      expect(getUserGroupRule({ name: ['James', 'Jack'] })(user)).toEqual(false)
    })
    it('multiple rules', () => {
      expect(
        getUserGroupRule({
          name: 'John',
          age: 25,
        })(user),
      ).toEqual(true)
      expect(
        getUserGroupRule({
          name: 'John',
          age: 13,
        })(user),
      ).toEqual(false)
    })
  })
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
