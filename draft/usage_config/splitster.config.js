// Define splitster configuration
const TRACK_CONSOLE_ID = "CONSOLE"

const GROUP_EN_USERS_ID = "EN_USERS"

const config = {
  tests: [
    {
      // Id of test
      id: "button_color",
      // Short description
      description: "Check if user likes more red button or right button",
      // Groups which user must satisfy
      user_groups: [GROUP_EN_USERS_ID],
      // Overall usage in %
      usage: 100,
      // Array of variants
      variants: [
        {
          // Variant id
          id: "red",
          // Variant value
          value: "RED",
          // Variant ratio to use
          ratio: 3,
        },
        {
          id: "blue",
          value: "BLUE",
          ratio: 4,
        },
      ],
      // Defined tracks for this test (array, or id, or single track function)
      track: [
        TRACK_CONSOLE_ID,
        (res) => {console.error(res)},
      ],
    },
  ],
  // Define user groups
  user_groups: [
    {
      id: GROUP_EN_USERS_ID,
      check: {
        "language": ["en", "hk"],
      },
    },
  ],
  // Define common tracks
  tracks: [
    {
      id: TRACK_CONSOLE_ID,
      run: (res) => {console.log(res)},
    },
  ],
}

export default config