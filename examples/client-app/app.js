// import splitster from "splitster"
import splitster from "../../lib/main"

import config, { BUTTON_COLOR } from "./config"

splitster.init(config)

splitster.run(BUTTON_COLOR)

document.getElementById("app")

const button = document.createElement("button")

const variant = splitster.get(BUTTON_COLOR)
if (variant.value === "RED") {
  button.style = "background-color=red"
} else if (variant.value === "BLUE") {
  button.style = "background-color=blue"
}

button.onclick = () => {
  splitster.track(BUTTON_COLOR)
}