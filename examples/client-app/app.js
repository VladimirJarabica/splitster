// import splitster from "splitster"
import splitsterInit from "../../src/main"

import config, { BUTTON_COLOR } from "./config"

const splitster = splitsterInit(config)
window.splitster = splitster
window.config = config

splitster.run(BUTTON_COLOR)

const app = document.getElementById("app")
const button = document.createElement("button")
button.innerHTML = "Button"

app.appendChild(button)

const variant = splitster.get(BUTTON_COLOR)
if (variant.value === "RED") {
  button.style.backgroundColor = "red"
} else if (variant.value === "BLUE") {
  button.style.backgroundColor = "blue"
}

button.onclick = () => {
  splitster.track(BUTTON_COLOR)
}