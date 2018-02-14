'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var disableTestByDeadline = function disableTestByDeadline(test) {
  if (test.disabled || !test.deadline) {
    return test;
  }
  if (new Date(test.deadline) < new Date()) {
    return (0, _compose2.default)((0, _assoc2.default)('disabledReason', 'deadline'), (0, _assoc2.default)('disabled', true))(test);
  }
  return test;
};

var disableByDeadline = (0, _map2.default)(disableTestByDeadline);

exports.default = disableByDeadline;