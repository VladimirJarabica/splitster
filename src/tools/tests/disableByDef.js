// @flow
import R from 'ramda'

import type {
  DisabledReason,
  SaveResults,
  TestConfig,
  TestId,
  TestsConfig,
} from '../../types/index'

export const checkDisabled = (def: ?string) => {
  if (!def) {
    return {
      disabled: false,
      disabledReason: null,
    }
  }
  const [_, disabled, reason] = R.match(/^(__disabled_)(\w+)$/, def)
  const reasons: DisabledReason[] = ['usage', 'separate_test', 'user_group']

  if (Boolean(disabled) && R.contains(reason, reasons)) {
    return {
      disabled: true,
      disabledReason: reason,
    }
  }
  return {
    disabled: false,
    disabledReason: null,
  }
}

const disableByDef = (def: ?SaveResults = {}) => (
  tests: TestsConfig,
): TestsConfig =>
  R.mapObjIndexed((test: TestConfig, testId: TestId) => {
    if (test.disabled) {
      return test
    }
    return R.merge(test, checkDisabled(def[testId]))
  })(tests)

export default disableByDef
