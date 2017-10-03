// @flow
import type { Config, TestConfig } from '../types'

const defaultConfig: Config = {
  tests: {},
  userGroups: {},
  tracks: {},
  options: {
    separateTest: false,
    cookies: {
      disabled: false,
      expiration: 30, // TODO: check if it is alright
      name: 'splitster',
    },
  },
}

export const defaultTestConfig: TestConfig = {
  description: '',
  userGroup: {},
  usage: 100,
  // runTrack: '',
  // useTrack: '',
  // endTrack: '',
  defaultVariant: '',
  variants: {},
  disabled: false,
  disabledReason: null,
}

export default defaultConfig
