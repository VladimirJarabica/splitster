// @flow
import R from 'ramda'
import Random from 'random-js'

import { testDefProperlySet } from './testsTools'
import type { SaveResults, TestId, TestsConfig } from '../../types/index'

const disableByUsage = (def: ?SaveResults = {}) => (
  tests: TestsConfig,
  testRandom?: number,
): TestsConfig =>
  R.mapObjIndexed((test: TestConfig, testId: TestId) => {
    if (
      testDefProperlySet(testId, def) ||
      test.disabled ||
      R.isNil(test.usage)
    ) {
      return test
    }
    const rand = testRandom || Random.integer(0, 99)(Random.engines.nativeMath)
    if (rand >= test.usage) {
      return R.merge(test, {
        disabled: true,
        disabledReason: 'usage',
      })
    }
    return test
  }, tests)

export default disableByUsage
