"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var defaultConfig = {
  test: {},
  userGroups: {},
  tracks: {},
  options: {
    separateTest: false,
    cookies: {
      disable: false,
      expiration: 30, // TODO: check if it is alright
      name: "splitster"
    }
  }
};
exports.default = defaultConfig;