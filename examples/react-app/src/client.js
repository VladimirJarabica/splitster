import React from 'react'
import { render } from 'react-dom'

import splitsterInit from "../../../lib/main"

import App from './app/App'
import config from "./config"

const splitsterState = JSON.parse(document.body.getAttribute("data-splitster"))
const splitster = splitsterInit(config)

console.log("splitster", splitster.getSaveResults())

render(
  <App splitster={splitster} />,
  //<App x={{x: 123}}/>,
  document
)