// @flow
import R from 'ramda'

import type { TestsConfig } from '../../types/index'
import { mergeDefaultTests, testDefProperlySet } from './testsTools'
import { getUserGroup } from '../userGroupsTools'

export const testsConfig: TestsConfig = mergeDefaultTests({
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

export const testsDef = {
  test_a: 'b',
  test_x: 'x',
  test_h: 'k',
}

export const tyrion = {
  name: 'Tyrion',
  height: 130,
  wisdom: 'Great',
}

export const userGroups: UserGroups = R.mapObjIndexed(
  (value, key, obj) => getUserGroup(value),
  {
    isWise: { wisdom: 'Great' },
    maybeWise: { wisdom: ['Great', 'Good'] },
    notWise: user => user.wisdom === 'none',
  },
)

export const mapDisabledProp = (tests: TestsConfig): boolean[] =>
  R.values(tests).map(R.prop('disabled'))
export const mapDisabledReasonProp = (tests: TestsConfig): string[] =>
  R.values(tests).map(R.prop('disabledReason'))

describe('#testsTools', () => {
  describe('#testDefProperlySet', () => {
    it('should correctly test def properly is set', () => {
      expect(testDefProperlySet('x', { x: 'good' })).toBe(true)
      expect(testDefProperlySet('x', { y: 'bad' })).toBe(false)
      expect(testDefProperlySet('x', { x: '__disabled_config' })).toBe(false)
    })
  })
})
