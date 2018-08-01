'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _findConfig = require('find-config');

var _findConfig2 = _interopRequireDefault(_findConfig);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _detectDr = require('./feature/detectDr');

var _detectDr2 = _interopRequireDefault(_detectDr);

var _configModel = require('./Shared/configModel');

var _configModel2 = _interopRequireDefault(_configModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Symbol for private function
var _init = Symbol('_init');
var _detect = Symbol('_detect');
var _checkSourceIsReady = Symbol('_checkSourceIsReady');

var SeoMonkey = function () {
  function SeoMonkey() {
    var configFileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'seomonkey.config.json';

    _classCallCheck(this, SeoMonkey);

    // Config Parameter
    this.config = null;
    this.inputSource = null;
    this._configFileName = configFileName;
    this[_init]();
  }

  _createClass(SeoMonkey, [{
    key: 'saveResultToConsole',
    value: function saveResultToConsole() {
      return this[_detect]().then(function (resultMsg) {
        resultMsg.forEach(function (msg) {
          console.log(msg);
        });
        return resultMsg;
      });
    }
  }, {
    key: 'saveResultToStream',
    value: function saveResultToStream() {
      var targetStream = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (targetStream == null) {
        throw new Error('Target stream is require');
      }
      if (targetStream.constructor !== _fs2.default.WriteStream) {
        throw new Error('Only WriteStream can be use');
      }
      var t = this;
      return new Promise(function (resolve, reject) {
        t[_detect]().then(function (resultMsg) {
          var inputMsg = '';
          resultMsg.forEach(function (msg) {
            inputMsg = inputMsg + msg + '\r\n';
          });
          targetStream.write(inputMsg, 'UTF8');
          targetStream.end();
          targetStream.on('finish', function () {
            resolve(targetStream);
          });
          targetStream.on('error', function (err) {
            reject(err);
          });
        });
      });
    }
  }, {
    key: 'saveResultToFile',
    value: function saveResultToFile() {
      var outputPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (outputPath == null) {
        throw new Error('outputPath cannot null');
      }
      return this[_detect]().then(function (resultMsg) {
        var inputMsg = '';
        resultMsg.forEach(function (msg) {
          inputMsg = inputMsg + msg + '\r\n';
        });
        _fs2.default.writeFileSync(outputPath, inputMsg);
        return 'write to file done';
      });
    }
    // Set all below  as private function

  }, {
    key: _init,
    value: function value() {
      // Read Config File
      var data = null;
      try {
        data = _fs2.default.readFileSync((0, _findConfig2.default)(this._configFileName, { dir: '/' }));
      } catch (error) {
        throw new Error('Cannot find config file , Monkey is crazy');
      }
      this.config = new _configModel2.default(data);
    }
  }, {
    key: _detect,
    value: function value() {
      this[_checkSourceIsReady]();
      var dr = new _detectDr2.default(this.config);
      var result = dr.detect(this.inputSource);
      // let result = new Promise(resolve => {
      //   resolve([])
      // })
      return result.then(function (allPromise) {
        return Promise.all(allPromise);
      });
    }
  }, {
    key: _checkSourceIsReady,
    value: function value() {
      if (this.inputSource == null) {
        throw new Error('Input source is empty');
      }
    }
  }]);

  return SeoMonkey;
}();

exports.default = SeoMonkey;