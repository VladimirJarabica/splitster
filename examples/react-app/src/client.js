import React from 'react'
import { render } from 'react-dom'

import splitsterInit from "../../../lib/main"

import App from './app/App'
import config from "./config"

const splitsterState = JSON.parse(document.body.getAttribute("data-splitster"))
const splitster = splitsterInit(config, null, splitsterState)

render(
  <App splitster={splitster} />,
  document
)