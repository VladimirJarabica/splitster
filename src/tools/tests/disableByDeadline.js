// @flow
import R from 'ramda'

import type { TestConfig } from '../../types/index'

const disableTestByDeadline = (test: TestConfig): TestConfig => {
  if (test.disabled || !test.deadline) {
    return test
  }
  if (new Date(test.deadline) < new Date()) {
    return R.compose(
      R.assoc('disabledReason', 'deadline'),
      R.assoc('disabled', true),
    )(test)
  }
  return test
}

const disableByDeadline: TestsConfig => TestsConfig = R.map(
  disableTestByDeadline,
)

export default disableByDeadline
