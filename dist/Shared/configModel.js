"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MonkeyRule = function () {
    function MonkeyRule() {
        _classCallCheck(this, MonkeyRule);

        this.RuleName = "";
        this.SearchRule = "";
        this.Minimum = 0;
        this.Maximum = 0;
        this.DetectedText = "";
    }

    _createClass(MonkeyRule, [{
        key: "_valid",
        value: function _valid() {
            if (this.Minimum < 0 || this.Maximum < 0) {
                throw new Error("The Rule " + this.RuleName + " Minimum or Maximum cannot less than 0");
            }
            if (this.Minimum > this.Maximum) {
                throw new Error("The Rule " + this.RuleName + " Minimum cannot more than Maximum");
            }
            if (this.SearchRule.trim().length <= 0) {
                throw new Error("The Rule " + this.RuleName + " SearchRule cannot empty");
            }
        }
    }]);

    return MonkeyRule;
}();

var ConfigModel = function () {
    function ConfigModel(config) {
        _classCallCheck(this, ConfigModel);

        config = JSON.parse(config);
        this.DetectedText = config.DetectedText || "";
        this.MonkeyRules = this._getRules(config.MonkeyRules) || [];
    }

    _createClass(ConfigModel, [{
        key: "_getRules",
        value: function _getRules(rules) {
            var result = rules.map(function (item) {
                var rule = new MonkeyRule();
                Object.assign(rule, item);
                rule._valid();
                return rule;
            });
            return result.length > 0 ? result : null;
        }
    }]);

    return ConfigModel;
}();

exports.default = ConfigModel;