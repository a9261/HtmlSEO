'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultDetect = defaultDetect;

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JSDOM = _jsdom2.default.JSDOM;
function defaultDetect(config) {
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (source == null) {
    throw new Error('source cannot empty');
  }

  var processResult = source.getSourceData().then(function (data) {
    // const doc = new JSDOM(data).window.document
    var doc = _cheerio2.default.load(data);
    var promises = config.MonkeyRules.map(function (rule) {
      return new Promise(function (resolve) {
        resolve(getDetectMsg(doc, rule, config));
      }); // end Promise
    });
    return promises;
  }); // end processResult
  return processResult;
}
function getDetectMsg(doc, rule, config) {
  // let detectNum = doc
  //   .querySelectorAll(rule.SearchRule)
  //   .length
  var detectNum = doc(rule.SearchRule).get().length;
  var fullMsg = rule.DetectedText.length > 0 ? rule.DetectedText : config.DetectedText;
  fullMsg = fullMsg.replace('{RuleName}', rule.RuleName).replace('{Num}', detectNum).replace('{Minimum}', rule.Minimum).replace('{Maximum}', rule.Maximum);
  if (detectNum < rule.Minimum || detectNum > rule.Maximum) {
    fullMsg = '[Warning] ' + fullMsg;
  }
  return fullMsg;
}