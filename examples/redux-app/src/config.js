// @flow
import type { Config } from "../../../src/index";

export const BUTTON_COLOR = "BUTTON_COLOR";

const CONSOLE = "CONSOLE";

const config: Config = {
  tests: {
    BUTTON_COLOR: {
      defaultVariant: "red",
      variants: {
        red: {
          value: "red",
          ratio: 1
        },
        blue: {
          value: "blue",
          ratio: 1
        }
      }
    },
    UNIVERSE_QUESTION: {
      defaultVariant: "wise",
      disabled: true,
      variants: {
        wise: 1,
        dumb: 1
      }
    }
  },
  options: {
    cookies: {
      // disable: true,
    }
  }
};

export default config;
