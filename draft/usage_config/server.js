import express from "express"
import cookieParser from "cookie-parser"
import path from "path"

// TODO: import as npm module
import { server as splitster } from "../../src/main"

import splitsterConfig, { TEST_BUTTON_COLOR } from "./splitster.config"

splitster.init(splitsterConfig)

const app = express()

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'dist')))

// TODO: Write our tests in config, ask people to write hypotetic tests

app.get("/", (req, res) => {
  //TODO: cookies expiration

  //TODO: Redux actions middleware actions: {type:xxx, experiment: ID_EXPERIMENT}
  //TODO: on action dispatch experiment will be tracked

  /**
   * TODO
   * send test results in html
   * send config with tracts atc as file js
   */


  // Some info about user - should be from request
  const user = {
    language: "en",
    os: "windows",
    device: "chrome",
    location: {},
  }
  // Runs one experiment for user
  // return variant
  // TODO: track - test war resolved - used "pageLoaded"
  splitster.run(TEST_BUTTON_COLOR, user)

  // Run all experiments for user
  // return object of variants: {id: variant}
  splitster.runAll(user)

  // Return winning for specified test.
  // Throws error if splitster not initialized or test not defined
  // TODO: in get set next tracking - "test was used" - just once
  const variant = splitster.get(TEST_BUTTON_COLOR)
  const variants = splitster.get()

  if (variant.value === "RED") {
    res.send("red")
  } else if (variant.value === "BLUE") {
    res.send("blue")
  }
  res.send("neither")

  setTimeout(() => {
    // Something good happened
    splitster.track(TEST_BUTTON_COLOR)

    //TODO: track multiple test
    splitster.track([1,2,3,4])


    splitster.trackAll()
  }, 5000)
})

app.listen(3000, () => {
  console.log('Server usage app listening on port 3000!')
})
