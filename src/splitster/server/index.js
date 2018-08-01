// @flow
import SplitsterServer from './SplitsterServer'

import type { Config, SaveResults } from '../../types'

import { mergeDefaultConfig, parseDef } from '../../tools/splitsterTools'

const splitsterInit = (config: Config, user: Object, def?: SaveResults) => {
  const mergedConfig = mergeDefaultConfig(config)
  return new SplitsterServer(
    mergedConfig,
    user,
    parseDef(mergedConfig.tests, def),
  )
}

export default splitsterInit
