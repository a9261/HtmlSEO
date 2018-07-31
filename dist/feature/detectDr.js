'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _detectWay = require('./detectWay');

var ways = _interopRequireWildcard(_detectWay);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DetectDr = function DetectDr(config) {
  _classCallCheck(this, DetectDr);

  this.detect = ways.defaultDetect.bind(this, config);
};

exports.default = DetectDr;