// @flow
import R from 'ramda'

import {
  mergeDefaultConfig,
  createTestsOpts,
  getSeparateTests,
  getTestsFromConfig,
  passTestUserGroups,
} from './splitsterTools'

import defaultConfig from './defaultConfig'

import type { TestsConfig } from '../types'
import type { TestUserGroupConfig } from '../types/index'
import { getUserGroup } from './userGroupsTools'

const testsConfig: TestsConfig = {
  test_a: {
    defaultVariant: 'a',
    variants: {
      a: 1,
      b: 2,
    },
  },
  test_x: {
    defaultVariant: 'x',
    variants: {
      x: 2,
      y: 1,
    },
  },
}

describe('splitsterToolsFn tests', () => {
  describe('merge default config', () => {
    it('should return default', () => {
      expect(mergeDefaultConfig({})).toEqual(defaultConfig)
    })
  })

  describe('test options', () => {
    it('without any params', () => {
      expect(createTestsOpts()).toEqual({
        disabled: false,
        winningVariant: null,
      })
    })
    it('disabled no def', () => {
      expect(createTestsOpts(null, true)).toEqual({
        disabled: true,
        winningVariant: '__disabled',
      })
    })
    it('disabled with def', () => {
      expect(createTestsOpts(null, true)).toEqual({
        disabled: true,
        winningVariant: '__disabled',
      })
    })
    it('default value', () => {
      expect(createTestsOpts('defValue')).toEqual({
        disabled: false,
        winningVariant: 'defValue',
      })
    })
  })

  describe('separate tests', () => {
    it('with runTest only', () => {
      expect(getSeparateTests(testsConfig, {}).test_a.disabled).toEqual(false)
      expect(getSeparateTests(testsConfig, {}).test_x.disabled).toEqual(true)
    })
  })

  describe('test from config', () => {
    describe('normal tests', () => {})
  })

  describe.only('#pastTestUserGroups', () => {
    const tyrion = {
      name: 'Tyrion',
      height: 130,
      wisdom: 'Great',
    }
    const testUserGroups: TestUserGroupConfig = {}

    const userGroups = R.mapObjIndexed(
      (value, key, obj) => getUserGroup(value),
      {
        isWise: { wisdom: 'Great' },
        maybeWise: { wisdom: ['Great', 'Good'] },
        notWise: user => user.wisdom === 'none',
      },
    )

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
    it.only('custom test user group config', () => {
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
