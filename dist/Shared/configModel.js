'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MonkeyRule = exports.MonkeyRule = function () {
  function MonkeyRule() {
    _classCallCheck(this, MonkeyRule);

    this.RuleName = '';
    this.SearchRule = '';
    this.Minimum = 0;
    this.Maximum = 0;
    this.DetectedText = '';
  }

  _createClass(MonkeyRule, [{
    key: 'valid',
    value: function valid() {
      if (this.Minimum < 0 || this.Maximum < 0) {
        throw new Error('The Rule ' + this.RuleName + ' Minimum or Maximum cannot less than 0');
      }
      if (this.Minimum > this.Maximum) {
        throw new Error('The Rule ' + this.RuleName + ' Minimum cannot more than Maximum');
      }
      if (this.SearchRule.trim().length <= 0) {
        throw new Error('The Rule ' + this.RuleName + ' SearchRule cannot empty');
      }
    }
  }]);

  return MonkeyRule;
}();

var _getRules = Symbol('_getRules');

var ConfigModel = function () {
  function ConfigModel(config) {
    _classCallCheck(this, ConfigModel);

    config = JSON.parse(config);
    this.DetectedText = config.DetectedText || '';
    this.MonkeyRules = this[_getRules](config.MonkeyRules) || [];
  }

  _createClass(ConfigModel, [{
    key: 'addRule',
    value: function addRule() {
      var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (rule == null) {
        throw new Error('Rule cannot be null');
      }
      if (rule.constructor !== MonkeyRule) {
        throw new Error('Parameter should be MonkeyRule');
      }
      rule.valid();
      this.MonkeyRules.push(rule);
    }
  }, {
    key: 'clearAllRule',
    value: function clearAllRule() {
      this.MonkeyRules = [];
    }
  }, {
    key: 'removeRuleAt',
    value: function removeRuleAt(index) {
      if (!(index - 1) < this.MonkeyRules.length) {
        this.MonkeyRules.splice(index - 1, 1);
      }
    }
  }, {
    key: _getRules,
    value: function value(rules) {
      var result = rules.map(function (item) {
        var rule = new MonkeyRule();
        Object.assign(rule, item);
        rule.valid();
        return rule;
      });
      return result.length > 0 ? result : null;
    }
  }]);

  return ConfigModel;
}();

exports.default = ConfigModel;