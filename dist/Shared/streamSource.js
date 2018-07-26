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

var StreamSource = function (_BaseSource) {
    _inherits(StreamSource, _BaseSource);

    function StreamSource() {
        var stream = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, StreamSource);

        var _this = _possibleConstructorReturn(this, (StreamSource.__proto__ || Object.getPrototypeOf(StreamSource)).call(this, stream));

        _this._valid();
        return _this;
    }

    _createClass(StreamSource, [{
        key: '_valid',
        value: function _valid() {
            if (this.source == null) {
                this.isValid = false;
                this.errorMsg = 'Wrong StreamSource';
            }
        }
    }, {
        key: 'getSourceData',
        value: function getSourceData() {
            var data = '';
            var inlineSource = this.source;
            inlineSource.on('data', function (chunk) {
                data += chunk;
            });
            return new Promise(function (resolve) {
                inlineSource.on('end', function () {
                    resolve(data);
                });
            });
        }
    }]);

    return StreamSource;
}(_baseSource2.default);

exports.default = StreamSource;