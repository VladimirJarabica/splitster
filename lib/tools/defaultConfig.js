'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var defaultConfig = {
  tests: {},
  userGroups: {},
  tracks: {},
  options: {
    separateTest: false,
    cookies: {
      disabled: false,
      expiration: 30, // TODO: check if it is alright
      name: 'splitster'
    }
  }
};
exports.default = defaultConfig;