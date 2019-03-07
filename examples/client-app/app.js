// import splitster from "splitster"
import Cookies from "js-cookie";
import R from "ramda";
import { parseCookies, init as initSplitster } from "../../src/index";

import config, { BUTTON_COLOR } from "./config";

const user = {
  lang: "en"
};
const init = () => {
  const userId = document.getElementById("userid").value;
  const splitster = initSplitster(config, user, userId, {
    BUTTON_COLOR: "__disabled_user_group_exclude"
  });
  window.splitster = splitster;
  console.log("values:", splitster.getSaveResults());
};

// Button for deleting all cookies
const resetButton = document.getElementById("reset");

resetButton.onclick = init;
