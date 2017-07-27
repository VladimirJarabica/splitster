import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { server as splitsterInit, parseCookies } from "../../../lib/main"
import config from "./config"


import App from './App'

const app = express()

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
  const def = parseCookies(req.cookies)
  const splitster = splitsterInit(config, null, def)
  splitster.runAll()

  const html = renderToStaticMarkup(
    <App splitster={splitster} />
  )

  res.send(html)
})

const port = 3000

app.listen(port, () => {
  console.log('App listen on port', port)
})
