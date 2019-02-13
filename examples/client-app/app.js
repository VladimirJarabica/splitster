// import splitster from "splitster"
import Cookies from "js-cookie";
import R from "ramda";
import {
  parseCookies,
  initSplitsterBrowser as splitsterInit
} from "../../src/index";

import config, { BUTTON_COLOR } from "./config";

const user = {
  lang: "de"
};
const init = () => {
  const userId = document.getElementById("userid").value;
  const splitster = splitsterInit(
    config,
    user,
    userId,
    parseCookies(Cookies.get())
  );
  window.splitster = splitster;
  console.log("values:", splitster.getSaveResults());
};

// Button for deleting all cookies
const resetButton = document.getElementById("reset");

resetButton.onclick = init;
