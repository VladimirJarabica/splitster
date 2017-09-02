// @flow
import type { Config } from '../../src/types'

export const BUTTON_COLOR = 'BUTTON_COLOR'

const CONSOLE = 'CONSOLE'

const config: Config = {
  tests: {
    BUTTON_COLOR: {
      defaultVariant: 'red',
      userGroup: 'deUser',
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
      usage: 50,
      runTrack: CONSOLE,
      useTrack: [CONSOLE],
      endTrack: [CONSOLE, console.warn],
    },
    SHOW_ADD: {
      defaultVariant: 'show',
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
      usage: 50,
    },
  },
  options: {
    separateTest: false,
    cookies: {
      // disable: true,
    },
  },
  userGroups: {
    deUser: { language: 'de' },
    enAdultUsers: [
      { language: ['en', 'us'] },
      (user: { age: number }) => user.age >= 18,
    ],
    isJohn: (user: { name: string }) => user.name.includes('John'),
  },
  tracks: {
    CONSOLE: console.log,
  },
}

export default config
