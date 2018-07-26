'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _detectDr = require('./feature/detectDr');

var _detectDr2 = _interopRequireDefault(_detectDr);

var _configModel = require('./Shared/configModel');

var _configModel2 = _interopRequireDefault(_configModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

var fs = require('fs');
var cfg = require('find-config');
var path = require('path');

var SeoMonkey = function () {
    function SeoMonkey() {
        var configFileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'seomonkey.config.json';

        _classCallCheck(this, SeoMonkey);

        //Config Parameter
        this.config = null;
        this.inputSource = null;
        this._configFileName = configFileName;
        this._init();
    }

    _createClass(SeoMonkey, [{
        key: '_init',
        value: function _init() {
            //Read Config File
            try {
                var data = fs.readFileSync(cfg(this._configFileName, { dir: '/' }));
                this.config = new _configModel2.default(JSON.parse(data));
            } catch (error) {
                // throw new Error(error);
                throw new Error('Cannot find config file , Monkey is crazy');
            }
        }
    }, {
        key: '_detect',
        value: function _detect() {
            this._checkSourceIsReady();
            var dr = new _detectDr2.default(this.config);
            var result = dr.detect(this.inputSource);
            return result;
        }
    }, {
        key: '_checkSourceIsReady',
        value: function _checkSourceIsReady() {
            if (this.inputSource == null) {
                throw new Error('Input source is empty');
            }
            if (!this.inputSource.isValid) {
                throw new Error(this.inputSource.errorMsg);
            }
        }
    }, {
        key: 'saveResultToConsole',
        value: function saveResultToConsole() {
            return this._detect().then(function (resultMsg) {
                resultMsg.forEach(function (msg) {
                    console.log(msg);
                });
                return resultMsg;
            });
        }
    }, {
        key: 'saveResultAsStream',
        value: function saveResultAsStream() {
            var targetStream = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (targetStream == null) {
                throw new Error('Target stream is require');
                return;
            }
            if (targetStream.constructor != fs.WriteStream) {
                throw new Error('Only WriteStream can be use');
                return;
            }
            var t = this;
            return new Promise(function (resolve, reject) {
                t._detect().then(function (resultMsg) {
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
        key: 'saveResultAsFile',
        value: function saveResultAsFile(outputPath) {
            return this._detect().then(function (resultMsg) {
                var inputMsg = '';
                resultMsg.forEach(function (msg) {
                    inputMsg = inputMsg + msg + '\r\n';
                });
                fs.writeFileSync(outputPath, inputMsg);
                return 'write to file done';
            });
        }
    }, {
        key: '_chkDirectory',
        value: function _chkDirectory(path) {

            return new Promise(function (resolve, reject) {
                fs.stat(path, function (err, stats) {
                    if (err && err.errno === 34) {
                        fs.mkdir(path);
                        resolve();
                    } else {
                        reject('path is wrong');
                    }
                });
            });
        }
    }]);

    return SeoMonkey;
}();

exports.default = SeoMonkey;