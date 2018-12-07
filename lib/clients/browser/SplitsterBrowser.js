'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _test = require('../../records/test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplitsterBrowser = function (_SplitsterClient) {
  _inherits(SplitsterBrowser, _SplitsterClient);

  function SplitsterBrowser() {
    var _ref;

    _classCallCheck(this, SplitsterBrowser);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = SplitsterBrowser.__proto__ || Object.getPrototypeOf(SplitsterBrowser)).call.apply(_ref, [this].concat(args)));

    if (!_this.options.cookies.disabled && !_jsCookie2.default.get('splitster_user_id')) {
      // Save user_id to cookies
      _jsCookie2.default.set('splitster_user_id', _this.userId);
    }
    return _this;
  }

  _createClass(SplitsterBrowser, [{
    key: 'set',
    value: function set(testId, variantId) {
      var cookie = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      console.log('here', testId, variantId, cookie, _get(SplitsterBrowser.prototype.__proto__ || Object.getPrototypeOf(SplitsterBrowser.prototype), 'set', this));
      var result = _get(SplitsterBrowser.prototype.__proto__ || Object.getPrototypeOf(SplitsterBrowser.prototype), 'set', this).call(this, testId, variantId, cookie);
      if (cookie) {
        // Dev only for replacing also cookie.
        // You need to handle parsing by yourself in `override` object
        var cookieKey = 'splitster_' + testId;
        (0, _jsCookie2.default)(cookieKey, variantId);
      }

      return result;
    }
  }]);

  return SplitsterBrowser;
}(_index2.default);

exports.default = SplitsterBrowser;