# Splitster
Javascript AB testing tool

# Configuration
```ecmascript 6
splitster.init(config)
```
Where config is an object with following structure:
```ecmascript 6
const config = {
  tests,
  userGroups,
  tracks,
  options,
}
export default config
```

## tests
Object of key value pairs representing running tests.

**Key:** string id of test

**Value:** test configuration
```ecmascript 6
// Your tests specified by id
const tests = {
  // Test with id test_1
  test_1: {

    // Short description - optional
    description: "Check if user likes more red, blue or green button",

    // Groups which user must satisfy - optional
    userGroups: ["enUsers"],

    // Overall usage of test in % - optional - if not specified 100 is used
    usage: 100,

    // Array of tracks to use when test is ran - optional
    runTrack: [],

    // Array of tracks to use when test is being first time applied in code - optional
    useTrack: [],

    // Array of tracks to use when test is successful
    endTrack: [],

    // Variants of the test specified by id.
    variants: {

      // Variant with id red
      red: {
        // If test is not ran, variant with specified default value is always returned
        // At least one of variants must be default
        default: true,

        // Actual value of variant. Will be return by calling splitser.get(test_id).value
        value: "RED",

        // Ratio of probability distribution against other variants
        // ratio 1-1 (also 50-50) means 50% probability
        ratio: 3,
      },
      blue: {
        value: "BLUE",
        ratio: 4,
      },
      green: {
        value: "GREEN",
        ration: 2,
      },
    },
  },
}
```
### tracks
Track may be string ID of object specified in general tracks section, or inline function taking result of test:
```ecmascript 6
[
  GENERAL_TRACK_ID,
  (res) => {},
]
```
#### runTrack
tracks used when experiment is ran - this happens only one per test life
```ecmascript 6
splitster.run(test_id) // Runs one experiment
// OR
splitster.runAll() // Runs all experiments
```
#### useTrack
tracks used when experiment value is required. Runs only once.
Useful to make sure user has really seen experiment in action
```ecmascript 6
const variant = splitster.get(test_id) //useTracks calling
if (variant.value === 1) {
  // Do stuff
} else if (variant.value === 2) {
  // Do other stuff
}
```
#### endTrack
final tracks when test is successful. May be called multiple times.
```ecmascript 6
document.getElementById("button").addEventListener("click", () => {
  splitster.track(test_id) //endTracks calling
})
```
## userGroups *in progress*
Defines groups which user must satisfies if test can be started.
```ecmascript 6
splitster.run(test_id, user)
// OR
splitster.runAll(user)
```
Object of key value pairs
```ecmascript 6
const userGroups = {
  enUsers: [
    {"language": ["en", "hi"]}
  ],
  customUsers: [
    (user) => user.isValid(),
  ]
}
```
one group is an array of rules which user object must satisfies.

Rule can be object: defining structure of user object

or function which takes user object and if returns true, rule passed

## tracks
Object of tracks specified by id

**Track** is a function taking result of test and doing developer specified tasks.
Useful for logging, sending results etc.
```ecmascript 6
tracks = {
  CONSOLE_TRACK: (res) => { console.log(res) },
}
```

## options
Other options to set


**separateTest:** if true, only one test is used at time. Test is chosen randomly.
Useful when you don't want to pollute your results with too many tests running at the same time.

### cookies
**disable** if true, tests will not be saved to cookies.
Initialization won't get result from cookies but always run.

**expiration** number of days cookies should last.

**name** prefix of cookies set in browser - default *splitster*
{name_test_id}