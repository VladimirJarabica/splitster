// @flow
import type { Config } from "../../src/types"

export const BUTTON_COLOR = "BUTTON_COLOR"

const CONSOLE = "CONSOLE"

const config: Config = {
  tests: {
    BUTTON_COLOR: {
      defaultVariant: "red",
      variants: {
        red: {
          value: "RED",
          ratio: 1,
        },
        blue: {
          value: "BLUE",
          ratio: 1,
        },
      },
      runTrack: CONSOLE,
      useTrack: [CONSOLE],
      endTrack: [CONSOLE, console.warn],
    },
    SHOW_ADD: {
      defaultVariant: "show",
      variants: {
        show: {
          value: "SHOW",
          ratio: 1,
        },
        hide: {
          value: "HIDE",
          ratio: 1,
        },
      },
    }
  },
  options: {
    cookies: {
      // disable: true,
    }
  },
  tracks: {
    CONSOLE: console.log
  },
}

export default config
