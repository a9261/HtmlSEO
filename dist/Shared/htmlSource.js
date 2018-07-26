'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseSource = require('./baseSource');

var _baseSource2 = _interopRequireDefault(_baseSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require('path');
var fs = require('fs');

var HtmlSource = function (_BaseSource) {
    _inherits(HtmlSource, _BaseSource);

    function HtmlSource() {
        var filePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, HtmlSource);

        var _this = _possibleConstructorReturn(this, (HtmlSource.__proto__ || Object.getPrototypeOf(HtmlSource)).call(this, filePath));

        _this._valid();
        return _this;
    }

    _createClass(HtmlSource, [{
        key: '_valid',
        value: function _valid() {
            if (path.extname(this.source) !== '.html') {
                this.isValid = false;
                this.errorMsg = 'File extension name is not html';
                return;
            }
            if (!fs.existsSync(this.source)) {
                this.isValid = false;
                this.errorMsg = 'File is not exists';
            }
        }
    }, {
        key: 'getSourceData',
        value: function getSourceData() {
            var data = fs.readFileSync(this.source);
            return new Promise(function (resolve) {
                resolve(data.toString());
            });
        }
    }]);

    return HtmlSource;
}(_baseSource2.default);

exports.default = HtmlSource;