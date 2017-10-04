// @flow
import R from 'ramda'

import {
  mergeDefaultConfig,
  mergeDefaultTests,
  createTestsOpts,
  passTestUserGroups,
  disableByConfig,
  disableByUserGroups,
  getSeparateRunTestId,
  disableBySeparateTests,
  disableByUsage,
} from './splitsterTools'

import defaultConfig from './defaultConfig'

import type { TestsConfig } from '../types'
import { getUserGroup } from './userGroupsTools'
import type { UserGroups } from '../containers/UserGroup'

const testsConfig: TestsConfig = mergeDefaultTests({
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
})

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

const mapDisabledProp = (tests: TestsConfig): boolean[] =>
  R.values(tests).map(test => test.disabled)
const mapDisabledReasonProp = (tests: TestsConfig): string[] =>
  R.values(tests).map(test => test.disabledReason)

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
    describe('#disableByConfig', () => {
      const testsConfigDisabled = R.compose(
        R.assocPath(['test_a', 'disabled'], true),
        R.assocPath(['test_h', 'disabled'], true),
      )(testsConfig)
      it('without def', () => {
        const result1 = disableByConfig()(testsConfig)
        expect(mapDisabledProp(result1)).toEqual([false, false, false])
        expect(mapDisabledReasonProp(result1)).toEqual([null, null, null])
      })
      it('rewrite disabled in def by not disabled in config', () => {
        const result1 = disableByConfig({
          test_a: '__disabled_config',
        })(testsConfig)
        expect(mapDisabledProp(result1)).toEqual([false, false, false])
        expect(mapDisabledReasonProp(result1)).toEqual([null, null, null])
        const result2 = disableByConfig({
          test_a: '__disabled_config',
          test_x: '__disabled_config',
          test_h: '__disabled_config',
        })(testsConfig)
        expect(mapDisabledProp(result2)).toEqual([false, false, false])
        expect(mapDisabledReasonProp(result2)).toEqual([null, null, null])
      })
      it('disable by config', () => {
        const result1 = disableByConfig()(testsConfigDisabled)
        expect(mapDisabledProp(result1)).toEqual([true, false, true])
        expect(mapDisabledReasonProp(result1)).toEqual([
          'config',
          null,
          'config',
        ])
      })
      it('rewrite winning variant by disabled in config', () => {
        const result1 = disableByConfig(testsDef)(testsConfigDisabled)
        expect(mapDisabledProp(result1)).toEqual([true, false, true])
        expect(mapDisabledReasonProp(result1)).toEqual([
          'config',
          null,
          'config',
        ])
      })
    })
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
    describe('#disableBySeparateTests', () => {
      const separateTests = mergeDefaultTests({
        one: { disabled: true },
        two: { disabled: false },
        three: { disabled: true },
        four: { disabled: false },
        five: { disabled: false },
      })
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
          mapDisabledReasonProp(
            disableBySeparateTests({ runTest: 0, separate: true })(
              separateTests,
            ),
          ),
        ).toEqual([null, null, null, 'separate_test', 'separate_test'])
        expect(
          mapDisabledProp(
            disableBySeparateTests({ runTest: 2, separate: true })(
              separateTests,
            ),
          ),
        ).toEqual([true, true, true, true, false])
        expect(
          mapDisabledReasonProp(
            disableBySeparateTests({ runTest: 2, separate: true })(
              separateTests,
            ),
          ),
        ).toEqual([null, 'separate_test', null, 'separate_test', null])
        expect(
          mapDisabledProp(
            disableBySeparateTests({ runTest: 3, separate: true })(
              separateTests,
            ),
          ),
        ).toEqual([true, true, true, true, true])
        expect(
          mapDisabledReasonProp(
            disableBySeparateTests({ runTest: 3, separate: true })(
              separateTests,
            ),
          ),
        ).toEqual([
          null,
          'separate_test',
          null,
          'separate_test',
          'separate_test',
        ])
      })
    })
    describe('#disableByUsage', () => {
      it('should disable by specified usage', () => {
        const testWithUsage = mergeDefaultTests({
          one: { usage: 10, disabled: false },
          three: { usage: 50, disabled: false },
          four: { usage: 100, disabled: false },
        })
        expect(mapDisabledProp(disableByUsage()(testWithUsage, 10))).toEqual([
          true,
          false,
          false,
        ])
        expect(
          mapDisabledReasonProp(disableByUsage()(testWithUsage, 10)),
        ).toEqual(['usage', null, null])
        expect(mapDisabledProp(disableByUsage()(testWithUsage, 55))).toEqual([
          true,
          true,
          false,
        ])
        expect(
          mapDisabledReasonProp(disableByUsage()(testWithUsage, 55)),
        ).toEqual(['usage', 'usage', null])
        expect(mapDisabledProp(disableByUsage()(testWithUsage, 100))).toEqual([
          true,
          true,
          true,
        ])
        expect(
          mapDisabledReasonProp(disableByUsage()(testWithUsage, 100)),
        ).toEqual(['usage', 'usage', 'usage'])
      })
    })
  })
})
