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
          value: 'RED',
          ratio: 1,
        },
        blue: {
          value: 'BLUE',
          ratio: 1,
        },
      },
    },
    // __disabled_config
    SHOW_ADD: {
      defaultVariant: 'show',
      disabled: true,
      variants: {
        show: {
          value: 'SHOW',
          ratio: 1,
        },
        hide: {
          value: 'HIDE',
          ratio: 1,
        },
      },
    },
    // __disabled_usage
    UNIVERSE_QUESTION: {
      defaultVariant: 'wise',
      usage: 0,
      variants: {
        wise: 1,
        dumb: 1,
      },
    },
    // __disable_user_group
    KEK: {
      defaultVariant: 'lol',
      variants: {
        lol: 1,
        bur: 1,
      },
      userGroup: () => false,
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
