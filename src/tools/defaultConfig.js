// @flow
import type { Config } from "../types"

const defaultConfig: Config = {
  test: {},
  userGroups: {},
  tracks: {},
  options: {
    separateTest: false,
    cookies: {
      disable: false,
      expiration: 30, // TODO: check if it is alright
      name: "splitster",
    }
  },
}

export default defaultConfig
