"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Test = function Test(config) {
  _classCallCheck(this, Test);

  this.run = function () {};

  this.get = function () {
    return {
      value: "RED",
      ratio: 1
    };
  };
};

exports.default = Test;