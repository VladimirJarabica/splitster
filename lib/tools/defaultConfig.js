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
var defaultTestConfig = exports.defaultTestConfig = {
  description: '',
  userGroup: {},
  usage: 100,
  // runTrack: '',
  // useTrack: '',
  // endTrack: '',
  defaultVariant: '',
  variants: {},
  disabled: false,
  disabledReason: null,
  version: 0
};

exports.default = defaultConfig;