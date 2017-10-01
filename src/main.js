// @flow
// Default export - init of splitster app
export { default } from './splitster/client'
export { default as SplitsterClient } from './splitster/client/SplitsterClient'

// Server export
export { default as server } from './splitster/server'
export { default as SplitsterServer } from './splitster/server/SplitsterServer'

export { parseCookies } from './tools/cookiesTools'

// TODO: react
// TODO: then split react and redux to separate modules

// Types exports:
export type {
  Config,
  TestConfig,
  VariantConfig,
  UserGroupConfig,
  TrackConfig,
  OptionsConfig,
  SaveResults,
} from './types'

export type { Splitster } from './containers/Splitster'
