"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MonkeyRule = function MonkeyRule() {
    _classCallCheck(this, MonkeyRule);

    this.RuleName = "";
    this.SearchRule = "";
    this.Minimum = 0;
    this.Maximum = 0;
    this.DetectedText = "";
};

var ConfigModel = function () {
    function ConfigModel(config) {
        _classCallCheck(this, ConfigModel);

        this.DetectedText = config.DetectedText || "";
        this.MonkeyRules = this._getRules(config.MonkeyRules) || [];
    }

    _createClass(ConfigModel, [{
        key: "_getRules",
        value: function _getRules(rules) {
            var result = rules.map(function (item) {
                var rule = new MonkeyRule();
                Object.assign(rule, item);
                return rule;
            });
            return result.length > 0 ? result : null;
        }
    }]);

    return ConfigModel;
}();

exports.default = ConfigModel;