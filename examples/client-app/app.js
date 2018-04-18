// import splitster from "splitster"
import Cookies from 'js-cookie'
import R from 'ramda'
import splitsterInit, { parseCookies } from '../../src/main'

import config, { BUTTON_COLOR } from './config'

const user = {
  language: 'de',
}
const splitster = splitsterInit(config, user, parseCookies(Cookies.get()))
window.splitster = splitster
window.config = config
window.Cookies = Cookies

console.log("config", config, splitster)
// splitster.run(BUTTON_COLOR)
splitster.runAll()

// Button for deleting all cookies
const deleteCookies = document.getElementById('delete_cookies')
deleteCookies.onclick = () => {
  R.forEach(Cookies.remove, R.keys(Cookies.get()))
}

const app = document.getElementById('app')

const button = document.createElement('button')
button.innerHTML = 'Button'

app.appendChild(button)

const variant = splitster.get(BUTTON_COLOR)
console.log('getAll', splitster.getAll())
if (variant.value === 'RED') {
  button.style.backgroundColor = 'red'
} else if (variant.value === 'BLUE') {
  button.style.backgroundColor = 'blue'
}

button.onclick = () => {
  splitster.track(BUTTON_COLOR)
}
