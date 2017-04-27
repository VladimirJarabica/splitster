import express from "express"
import cookieParser from "cookie-parser"
import path from "path"
import splitster, { server, Test } from "../../lib/main"

const app = express()

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
  
  splitster.init()
  
  splitster.registerTest(new Test({
    id: "button-color",
    variants: [
      {
        id: "red",
        ratio: 3,
      },
      {
        id: "green",
        ratio: 3,
      },
      {
        id: "blue",
        ratio: 5,
      },
    ],
  }))
  splitster.registerTest(new Test({
    id: "header-color",
    variants: [
      {
        id: "grey",
        ratio: 7,
      },
      {
        id: "white",
        ratio: 9,
      },
      {
        id: "black",
        ratio: 4,
      },
    ],
  }))
  
  server(splitster.getState(), req, res, {rewriteCookie: true, fullTest: true})
  
  res.sendFile(path.join(__dirname + '/usage_server.html'));
})

app.listen(3000, () => {
  console.log('Server usage app listening on port 3000!')
})