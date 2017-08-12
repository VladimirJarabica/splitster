import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'

import React from 'react'
import { createStore } from 'redux'
import { renderToStaticMarkup } from 'react-dom/server'

import reducers from './store/reducers'

import App from './App'

const app = express()

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
  const store = createStore(reducers)

  const html = renderToStaticMarkup(<App store={store} />)

  res.send(html)
})

const port = 3000

app.listen(port, () => {
  console.log('App listen on port', port)
})
