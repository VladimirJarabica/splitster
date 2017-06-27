import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'

import { server as splitsterInit } from "../../../lib/main"
import config from "./config"


import App from './app/App'

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
  const splitster = splitsterInit(config)
  splitster.runAll()

  const html = renderToString(
    <App splitster={splitster} />
  )

  res.send(html)
})

const port = 3000

app.listen(port, () => {
  console.log('App listen on port', port)
})
