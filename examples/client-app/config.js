// @flow
import type { Config } from "../../src/index";

export const BUTTON_COLOR = "BUTTON_COLOR";

const CONSOLE = "CONSOLE";

const config: Config = {
  tests: {
    BUTTON_COLOR: {
      version: 1,
      defaultVariant: "red",
      variants: {
        red: {
          value: "RED",
          ratio: 1
        },
        blue: {
          value: "BLUE",
          ratio: 1
        }
      }
    },
    SHOW_ADD: {
      defaultVariant: "show",
      variants: {
        show: {
          value: "SHOW",
          ratio: 1
        },
        hide: {
          value: "HIDE",
          ratio: 1
        }
      },
      userGroup: {
        lang: ["en", "de"]
      }
    }
  },
  options: {
    cookies: {
      disabled: false
    }
  }
};

export default config;
