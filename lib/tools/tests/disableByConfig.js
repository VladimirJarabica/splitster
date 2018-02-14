'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _mapObjIndexed = require('ramda/src/mapObjIndexed');

var _mapObjIndexed2 = _interopRequireDefault(_mapObjIndexed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var disableByConfig = function disableByConfig() {
  var def = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (tests) {
    return (0, _mapObjIndexed2.default)(function (test, testId) {
      if (def[testId] && def[testId] === '__disabled_config') {
        // Disabled by def
        if (!test.disabled) {
          // Not disabled by config => change
          return test;
        }
        if (test.disabled) {
          // Still disabled in config => set reason
          return (0, _merge2.default)(test, {
            disabled: true,
            disabledReason: 'config'
          });
        }
      }
      // Not disabled by def
      if (test.disabled) {
        // Disabled in config => set reason
        return (0, _merge2.default)(test, {
          disabled: true,
          disabledReason: 'config'
        });
      }
      // Not disabled at all
      return test;
    }, tests);
  };
};

exports.default = disableByConfig;