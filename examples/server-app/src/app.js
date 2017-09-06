import express from 'express'
import { server as splitsterInit } from '../../../src/main'

import config from './config'

const app = express()

app.get('/', (req, res) => {
  const user = {
    language: 'en',
    os: 'windows',
    device: 'chrome',
    location: {},
  }

  // TODO: create config
  const splitster = splitsterInit(config, user)

  splitster.runAll()

  res.json(splitster.getSaveResults())
})

app.listen(3000, () => {
  console.log('Server client app running on port 3000!')
})
