// @flow
import R from 'ramda'

import defaultConfig from './defaultConfig'

import type { Config } from '../types/index'

const mergeDefaultConfig = (config: Config): Config =>
  R.mergeDeepLeft(config, defaultConfig)

export default mergeDefaultConfig
