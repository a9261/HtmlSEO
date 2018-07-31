'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _valid = Symbol('protetcedValid');

var BaseSource = function () {
  function BaseSource() {
    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, BaseSource);

    this.isValid = true;
    this.source = source;
    this.errorMsg = '';
  }

  _createClass(BaseSource, [{
    key: _valid,
    value: function value() {
      if (this.source == null) {
        throw new Error('Source parameter cannot be null');
      }
    }
  }, {
    key: 'getSourceData',
    value: function getSourceData() {}
  }]);

  return BaseSource;
}();

exports._valid = _valid;
exports.default = BaseSource;