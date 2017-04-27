import express from "express"
import cookieParser from "cookie-parser"
import path from "path"

const app = express()

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'dist')))

app.get("/", (req, res) => {
  res.send("hello")
})

app.listen(3000, () => {
  console.log('Server usage app listening on port 3000!')
})

// import splitster from "splitster"
//
//
// // Some info abound user
// const user = {
//   language: "en",
//   os: "windows",
//   device: "chrome",
//   location: {},
// }
//
// // Runs one experiment for user
// splitster.run("button_color", user)
//
//
// // Runs all expretiments for user
// splister.runAll(user)
//
