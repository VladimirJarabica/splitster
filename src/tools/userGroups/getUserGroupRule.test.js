import { user } from './userGroupsTools.test'
import { getUserGroupRule } from './getUserGroupRule'

describe('#userGroupRule', () => {
  it('function config', () => {
    expect(getUserGroupRule(u => u.name === 'John')(user)).toEqual(true)
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
