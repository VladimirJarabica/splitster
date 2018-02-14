// @flow
import R from 'ramda'

import type {
  SaveResults,
  TestConfig,
  TestId,
  TestsConfig,
} from '../../types/index'

const disableByConfig = (def: ?SaveResults = {}) => (
  tests: TestsConfig,
): TestsConfig =>
  R.mapObjIndexed((test: TestConfig, testId: TestId) => {
    if (def[testId] && def[testId] === '__disabled_config') {
      // Disabled by def
      if (!test.disabled) {
        // Not disabled by config => change
        return test
      }
      if (test.disabled) {
        // Still disabled in config => set reason
        return R.merge(test, {
          disabled: true,
          disabledReason: 'config',
        })
      }
    }
    // Not disabled by def
    if (test.disabled) {
      // Disabled in config => set reason
      return R.merge(test, {
        disabled: true,
        disabledReason: 'config',
      })
    }
    // Not disabled at all
    return test
  }, tests)

export default disableByConfig
