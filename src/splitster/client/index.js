// @flow
import SplitsterClient from './SplitsterClient'

import { mergeDefaultConfig, parseDef } from '../../tools/splitsterTools'

import type { Config, SaveResults } from '../../types'

const splitsterInit = (config: Config, user?: ?Object, def?: SaveResults) => {
  const mergedConfig = mergeDefaultConfig(config)
  return new SplitsterClient(
    mergedConfig,
    user,
    parseDef(mergedConfig.tests, def),
  )
}

export default splitsterInit
