// @flow
import R from 'ramda'

import getNormalTests from './getNormalTests'
import disableByUsage from './disableByUsage'
import disableBySeparateTests from './disableBySeparateTests'
import disableByUserGroups from './disableByUserGroups'
import disableByDeadline from './disableByDeadline'
import disableByDef from './disableByDef'
import disableByConfig from './disableByConfig'

import { defaultTestConfig } from '../defaultConfig'

import type {
  TestsConfig,
  TracksConfig,
  SaveResults,
  TestId,
} from '../../types/index'
import type { UserGroups } from '../../containers/UserGroup'
import type { Tests } from '../../containers/Test'

export type TestFromConfigOpts = {
  tracks?: TracksConfig,
  def?: SaveResults,
  separate?: boolean,
  runTest?: number,
  userGroups?: UserGroups,
  user: ?Object,
}

export const mergeDefaultTests = (tests: TestsConfig): TestsConfig =>
  R.map(R.mergeDeepRight(defaultTestConfig), tests)

// If test is set to disabled config, it will consider as rewritable in cookies
export const testDefProperlySet = (testId: TestId, def: ?SaveResults) =>
  R.has(testId, def) && def[testId] !== '__disabled_config'

export const getTestsFromConfig = (
  tests: TestsConfig = {},
  opts: TestFromConfigOpts,
): Tests => {
  // TODO: consider checking one by one
  // TODO: change from __disabled_config to another, if disabled in config has changed
  const { def, userGroups, user } = opts

  return R.compose(
    getNormalTests(opts), // construct tests
    disableByUsage(def), // disable by usage
    disableBySeparateTests(opts, def), // disable by separate tests
    disableByUserGroups(userGroups, user, def), // disable by user group
    disableByDeadline,
    disableByDef(def),
    disableByConfig(def), // set disabled by default or config
    mergeDefaultTests,
  )(tests)
}
