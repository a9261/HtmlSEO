'use strict';

var _benchmark = require('benchmark');

var _benchmark2 = _interopRequireDefault(_benchmark);

var _dist = require('../dist');

var _dist2 = _interopRequireDefault(_dist);

var _findConfig = require('find-config');

var _findConfig2 = _interopRequireDefault(_findConfig);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var suite = new _benchmark2.default.Suite();

var monkey = new _dist2.default();

suite.add('Console output test', {
  'defer': true,
  'fn': function fn(deferred) {
    var filePath = (0, _findConfig2.default)('test.html', { dir: '/test' });
    monkey.inputSource = new _dist.HtmlSource(filePath);
    monkey.saveResultToConsole().then(function (res) {
      deferred.resolve();
    }).catch(function (err) {
      throw new Error(err);
    });
  }
}).add('saveResultAsFile test', {
  'defer': true,
  'fn': function fn(deferred) {
    var filePath = (0, _findConfig2.default)('test.html', { dir: '/test' });
    monkey.inputSource = new _dist.HtmlSource(filePath);
    monkey.saveResultAsFile('demo.txt').then(function (res) {
      deferred.resolve();
    }).catch(function (err) {
      throw new Error(err);
    });
  }
}).add('saveResultAsStream test', {
  'defer': true,
  'fn': function fn(deferred) {
    var filePath = (0, _findConfig2.default)('test.html', { dir: '/test' });
    monkey.inputSource = new _dist.HtmlSource(filePath);
    var writerStream = _fs2.default.createWriteStream('output.txt');
    monkey.saveResultAsStream(writerStream).then(function (res) {
      deferred.resolve();
    }).catch(function (err) {
      throw new Error(err);
    });
  }
})
// add listeners
.on('cycle', function (event) {
  console.log(String(event.target));
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
