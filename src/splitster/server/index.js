// @flow
import SplitsterServer from './SplitsterServer'

import type { Config, SaveResults } from '../../types'

import { mergeDefaultConfig } from '../../tools/splitsterToolsFn'

const splitsterInit = (config: Config, user: Object, def?: SaveResults) =>
  new SplitsterServer(mergeDefaultConfig(config), user, def)

export default splitsterInit
