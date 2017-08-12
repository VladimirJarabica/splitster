// @flow
import type { Config } from '../../../src/types/index'

export const BUTTON_COLOR = 'BUTTON_COLOR'

const CONSOLE = 'CONSOLE'

const config: Config = {
  tests: {
    BUTTON_COLOR: {
      defaultVariant: 'red',
      variants: {
        red: {
          value: 'red',
          ratio: 1,
        },
        blue: {
          value: 'blue',
          ratio: 1,
        },
      },
      runTrack: CONSOLE,
      useTrack: [CONSOLE],
      endTrack: [CONSOLE, console.warn],
    },
  },
  options: {
    cookies: {
      // disable: true,
    },
  },
  tracks: {
    CONSOLE: console.log,
  },
}

export default config
