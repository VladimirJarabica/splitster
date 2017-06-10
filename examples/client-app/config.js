// @flow
import type { Config } from "../../src/types"

export const BUTTON_COLOR = "BUTTON_COLOR"

const config: Config = {
  tests: {
    BUTTON_COLOR: {
      variants: {
        red: {
          def: true,
          value: "RED",
          ratio: 1,
        },
        blue: {
          value: "BLUE",
          ratio: 1,
        },
      },
    },
  },
  tracks: {
    CONSOLE: console.log
  },
}

export default config
