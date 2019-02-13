"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REASONS = undefined;

var _contains = require("ramda/src/contains");

var _contains2 = _interopRequireDefault(_contains);

var _match = require("ramda/src/match");

var _match2 = _interopRequireDefault(_match);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REASONS = exports.REASONS = ["usage", "separate_test", "user_group", "user_group_exclude", "deadline", "dev"];

var DISABLED_REGEX = /^(__disabled_)(\w+)$/;

var checkDisabled = function checkDisabled(override) {
  if (!override) {
    return {
      disabled: false,
      disabledReason: null
    };
  }

  var _R$match = (0, _match2.default)(DISABLED_REGEX, override),
      _R$match2 = _slicedToArray(_R$match, 3),
      _ = _R$match2[0],
      disabled = _R$match2[1],
      reason = _R$match2[2];

  if (Boolean(disabled) && (0, _contains2.default)(reason, REASONS)) {
    return {
      disabled: true,
      // TODO: temporary fix, remove 'null'
      disabledReason: reason
    };
  }
  if (Boolean(disabled) && reason === "null") {
    return {
      disabled: true,
      // TODO: temporary fix, remove 'null'
      disabledReason: "config"
    };
  }
  return {
    disabled: false,
    disabledReason: null
  };
};

exports.default = checkDisabled;