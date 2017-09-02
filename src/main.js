// @flow
// Default export - init of splitster app
export { default } from './splitster/client'
// Server export
export { default as server } from './splitster/server'

export { parseCookies } from './tools/cookiesTools'

// redux
export { default as splitsterRedux } from './redux'

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
} from './types'
