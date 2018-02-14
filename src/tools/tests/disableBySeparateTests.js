// @flow
import R from 'ramda'
import Random from 'random-js'

import { testDefProperlySet } from './testsTools'

import type { SaveResults, TestConfig, TestId } from '../../types/index'

/**
 * Get id of test, which will be ran in separate mode.
 */
export const getSeparateRunTestId = (tests: TestsConfig, runTest: ?number) => {
  const enabledTestsIds = R.compose(
    R.filter(Boolean),
    R.values,
    R.mapObjIndexed(
      (test: TestConfig, key: TestId) => (test.disabled ? null : key),
    ),
  )(tests)
  const runTestNumber = Number.isInteger(runTest)
    ? runTest
    : Random.integer(0, enabledTestsIds.length - 1)(Random.engines.nativeMath)
  return enabledTestsIds[runTestNumber]
}

const disableBySeparateTests = (
  { runTest, separate = false }: TestFromConfigOpts,
  def: ?SaveResults = {},
) => (tests: TestsConfig = {}): TestsConfig => {
  if (!separate) return tests

  const separateRunTestId = getSeparateRunTestId(tests, runTest)

  return R.mapObjIndexed((test: TestConfig, testId: TestId) => {
    if (
      testDefProperlySet(testId, def) ||
      test.disabled ||
      testId === separateRunTestId
    ) {
      return test
    }
    return R.merge(test, {
      disabledReason: 'separate_test',
      disabled: true,
    })
  }, tests)
}

export default disableBySeparateTests
