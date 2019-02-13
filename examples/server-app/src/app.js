import express from "express";
import { initSplitsterServer } from "../../../src/index";

import config from "./config";

const app = express();

app.get("/", (req, res) => {
  const user = {
    language: "en",
    os: "windows",
    device: "chrome",
    location: {}
  };

  const def = {
    // KEK: '__disabled_user_group',
    KEK: "__disabled_dev"
  };

  // TODO: create config
  const splitster = initSplitsterServer(config, user, def);

  // splitster.runAll();

  res.json(splitster.getSaveResults());
});

app.listen(3000, () => {
  console.log("Server client app running on port 3000!");
});
