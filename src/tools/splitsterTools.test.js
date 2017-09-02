// @flow
import R from 'ramda'

import {
  mergeDefaultConfig,
  createTestsOpts,
  passTestUserGroups,
  disableByUserGroups,
  getSeparateRunTestId,
  disableBySeparateTests,
  disableByUsage,
} from './splitsterTools'

import defaultConfig from './defaultConfig'

import type { TestsConfig } from '../types'
import { getUserGroup } from './userGroupsTools'
import type { UserGroups } from '../containers/UserGroup'

const testsConfig: TestsConfig = {
  test_a: {
    defaultVariant: 'a',
    variants: {
      a: 1,
      b: 2,
    },
    userGroups: 'isWise',
  },
  test_x: {
    defaultVariant: 'x',
    variants: {
      x: 2,
      y: 1,
    },
    userGroup: ['notWise', 'maybeWise'],
  },
  test_h: {
    defaultVariant: 'h',
    variants: {
      h: 2,
      k: 1,
    },
    userGroup: ['maybeWise', user => user.name === 'Tyrion', { height: 130 }],
  },
}

const testsDef = {
  test_a: 'b',
  test_x: 'x',
  test_h: 'k',
}

const tyrion = {
  name: 'Tyrion',
  height: 130,
  wisdom: 'Great',
}

const userGroups: UserGroups = R.mapObjIndexed(
  (value, key, obj) => getUserGroup(value),
  {
    isWise: { wisdom: 'Great' },
    maybeWise: { wisdom: ['Great', 'Good'] },
    notWise: user => user.wisdom === 'none',
  },
)

const mapDisabledProp = (tests: TestsConfig): string[] =>
  R.values(tests).map(test => test.disabled)

describe('splitsterToolsFn tests', () => {
  describe('merge default config', () => {
    it('should return default', () => {
      expect(mergeDefaultConfig({})).toEqual(defaultConfig)
    })
  })

  describe('test options', () => {
    it('without any params', () => {
      expect(createTestsOpts()).toEqual({
        winningVariant: null,
      })
    })
    it('default value', () => {
      expect(createTestsOpts('defValue')).toEqual({
        winningVariant: 'defValue',
      })
    })
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

  describe('#getTestsFromConfig', () => {
    describe('#disableByUserGroups', () => {
      it('should correctly disable', () => {
        expect(
          mapDisabledProp(disableByUserGroups(userGroups, tyrion)(testsConfig)),
        ).toEqual([false, true, false])
      })
    })
    describe('#disableBySeparateTests', () => {
      const separateTests = {
        one: { disabled: true },
        two: { disabled: false },
        three: { disabled: true },
        four: { disabled: false },
        five: { disabled: false },
      }
      it('should get right separate run test id', () => {
        expect(getSeparateRunTestId(separateTests, 0)).toEqual('two')
        expect(getSeparateRunTestId(separateTests, 1)).toEqual('four')
        expect(getSeparateRunTestId(separateTests, 2)).toEqual('five')
        expect(getSeparateRunTestId(separateTests, 3)).toEqual(undefined)
        expect(getSeparateRunTestId(separateTests)).toBeDefined()
        expect(getSeparateRunTestId(separateTests)).toMatch(/two|four|five/)
      })
      it('should disable except separate test', () => {
        expect(
          mapDisabledProp(
            disableBySeparateTests({ runTest: 0, separate: true })(
              separateTests,
            ),
          ),
        ).toEqual([true, false, true, true, true])
        expect(
          mapDisabledProp(
            disableBySeparateTests({ runTest: 2, separate: true })(
              separateTests,
            ),
          ),
        ).toEqual([true, true, true, true, false])
        expect(
          mapDisabledProp(
            disableBySeparateTests({ runTest: 3, separate: true })(
              separateTests,
            ),
          ),
        ).toEqual([true, true, true, true, true])
      })
    })
    describe.only('#disableByUsage', () => {
      it('should disable by specified usage', () => {
        const testWithUsage = {
          one: { usage: 10, disabled: false },
          three: { usage: 50, disabled: false },
          four: { usage: 100, disabled: false },
        }
        expect(mapDisabledProp(disableByUsage(testWithUsage, 10))).toEqual([
          true,
          false,
          false,
        ])
        expect(mapDisabledProp(disableByUsage(testWithUsage, 55))).toEqual([
          true,
          true,
          false,
        ])
        expect(mapDisabledProp(disableByUsage(testWithUsage, 100))).toEqual([
          true,
          true,
          true,
        ])
      })
    })
  })
})
