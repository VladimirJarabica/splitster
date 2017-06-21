// Define splitster configuration
const TRACK_CONSOLE_ID = "CONSOLE"

const GROUP_EN_USERS_ID = "EN_USERS"

export const TEST_BUTTON_COLOR = "BUTTON_COLOR"

const config = {
  options: {
    //TODO: runs only one test by session
    separateTest: true,
  },
  tests: {
    // Id of test
    TEST_BUTTON_COLOR:
    {
      // Short description
      description: "Check if user likes more red button or blue button",
      // Groups which user must satisfy
      user_groups: [GROUP_EN_USERS_ID],
      // Overall usage in %
      // TODO: solve by statistic - if 50% - serve to every 2. person
      usage: 100,
      // TODO: default variant not in variants?
      defaultVariant: "red",
      // Array of variants
      variants: {
        // Variant id
        red: {
          // TODO: If test is not user, always return default. If not specified, use first
          // TODO: force user to specify default
          default: true,
          // Variant value
          value: "RED",
          // Variant ratio to use
          ratio: 3,
        },
        blue: {
          value: "BLUE",
          ratio: 4,
        },
      },
      // Defined tracks for this test (array, or id, or single track function)
      // TODO: takes keys of tracks, or specific tracks
      track: [
        TRACK_CONSOLE_ID,
        () => {}
      ],
    },
    TIMELINE: {
      user_groups: user => isModern(user.browser),
      defaultVariant: "old",
      variants: {
        "new": {
          ratio: 1,
        },
        old: {
          ratio: 1
        }
      },
      runTrack: () => {},
      // TODO: track test lifetime from run to end
      // TODO: rename ENDtrack? it can be called more than once
      endTrack: (res) => { console.log(res.lifetime)},
    },
    HEADER: {
      defaultVariant: "old",
      variants: {
        "new": {
          ratio: 1,
        },
        old: {
          ratio: 1
        }
      },
      endTrack: () => {},
    },
  },
  // Define user groups
  user_groups: {
    GROUP_EN_USERS_ID: {
      check: {
        "language": ["en", "hk"],
      },
      functionCheck: (user) => true,
    }
  },
  // Define common tracks
  tracks: {
    TRACK_CONSOLE_ID: {
      run: (res) => {console.log(res)},
    },
    INFINARIO: {
      run: (res) => infinario(res)
    }
  },
}

export default config