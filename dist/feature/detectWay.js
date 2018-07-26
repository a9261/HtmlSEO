'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultDetect = defaultDetect;

var _htmlSource = require('../Shared/htmlSource');

var _htmlSource2 = _interopRequireDefault(_htmlSource);

var _streamSource = require('../Shared/streamSource');

var _streamSource2 = _interopRequireDefault(_streamSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
function defaultDetect(config) {
    var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (source == null) {
        throw new Error('source cannot empty');
    }

    var processResult = source.getSourceData().then(function (data) {
        var doc = new JSDOM(data).window.document;
        var promises = config.MonkeyRules.map(function (rule) {
            return new Promise(function (resolve) {
                var detectNum = doc.querySelectorAll(rule.SearchRule).length;
                var fullMsg = rule.DetectedText.length > 0 ? rule.DetectedText : config.DetectedText;
                fullMsg = fullMsg.replace("{RuleName}", rule.RuleName).replace("{Num}", detectNum).replace("{Minimum}", rule.Minimum).replace("{Maximum}", rule.Maximum);
                if (detectNum < rule.Minimum || detectNum > rule.Maximum) {
                    fullMsg = '[Warning] ' + fullMsg;
                }
                resolve(fullMsg);
            }); // end Promise
            // msg.push(fullMsg);
        });
        return Promise.all(promises);
    }); // end processResult
    return processResult;
}