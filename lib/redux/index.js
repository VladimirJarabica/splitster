'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SplitsterClient = require('../splitster/client/SplitsterClient');

var _SplitsterClient2 = _interopRequireDefault(_SplitsterClient);

var _SplitsterServer = require('../splitster/server/SplitsterServer');

var _SplitsterServer2 = _interopRequireDefault(_SplitsterServer);

var _main = require('../main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create server (serverInit)
 * then change from server (server splitster)
 * to save (SaveResults)
 * and then to client (client splitster)
 */
var splitsterReducer = function splitsterReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'splitster/INIT_SERVER':
      // $FlowFixMe
      return (0, _main.server)(action.config, action.user, action.def || state);
    case 'splitster/INIT_CLIENT':
      // $FlowFixMe
      return (0, _main2.default)(action.config, action.user, state);
    case 'splitster/SERVER_TO_SAVE':
    case 'splitster/CLIENT_TO_SAVE':
      // $FlowFixMe
      return state.getSaveResults();
    case 'splitster/RUN':
      if (action.test) {
        // $FlowFixMe
        state.run(action.test);
      } else {
        // $FlowFixMe
        state.runAll();
      }
      return state;
    case 'splitster/SET':
      // $FlowFixMe
      return state.set(action.testId, action.variantId);
    default:
      return state;
  }
};


var initServer = function initServer(config, user, def) {
  return {
    type: 'splitster/INIT_SERVER',
    config: config,
    user: user,
    def: def
  };
};

var initClient = function initClient(config, user) {
  return {
    type: 'splitster/INIT_CLIENT',
    config: config,
    user: user
  };
};

var serverToSave = function serverToSave() {
  return {
    type: 'splitster/SERVER_TO_SAVE'
  };
};

var clientToSave = function clientToSave() {
  return {
    type: 'splitster/CLIENT_TO_SAVE'
  };
};

var run = function run(test) {
  return {
    type: 'splitster/RUN',
    test: test
  };
};

var set = function set(testId, variantId) {
  return {
    type: 'splitster/SET',
    testId: testId,
    variantId: variantId
  };
};

exports.default = {
  splitsterReducer: splitsterReducer,
  initServer: initServer,
  initClient: initClient,
  serverToSave: serverToSave,
  clientToSave: clientToSave,
  run: run,
  set: set
};