"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge2 = require("ramda/src/merge");

var _merge3 = _interopRequireDefault(_merge2);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var disableByConfig = function disableByConfig(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      testId = _ref2[0],
      test = _ref2[1];

  if (test.disabled && !test.disabledReason) {
    return [testId, (0, _merge3.default)(test, {
      disabled: true,
      disabledReason: "config"
    })];
  }
  return [testId, test];
};

exports.default = disableByConfig;