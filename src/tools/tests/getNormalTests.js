// @flow
import R from 'ramda'

import { constructTest } from '../../containers/Test'

import type { TestFromConfigOpts } from './testsTools'
import type { TestsConfig } from '../../types/index'
import type { Tests } from '../../containers/Test'

export const createTestsOpts = (def: string): TestOptions => ({
  winningVariant: def || null,
})

const getNormalTests = ({ tracks = {}, def = {} }: TestFromConfigOpts) => (
  tests: TestsConfig = {},
): Tests =>
  R.reduce(
    (acc: Tests, key: string): Tests =>
      R.assoc(
        key,
        constructTest(key, tests[key], tracks, createTestsOpts(def[key])),
        acc,
      ),
    {},
    R.keys(tests),
  )

export default getNormalTests
