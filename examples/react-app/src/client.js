import React from 'react'
import { render } from 'react-dom'

import splitsterInit from "../../../lib/main"

import Root from './app/Root'
import config from "./config"

const splitsterState = JSON.parse(document.body.getAttribute("data-splitster"))
console.log("parsedState", splitsterState)
const splitster = splitsterInit(config, null, splitsterState)

render(
  <Root splitster={splitster} />,
  document.getElementById("app"),
)