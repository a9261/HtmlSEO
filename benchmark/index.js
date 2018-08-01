import Benchmark from 'benchmark'
import SeoMonkey,{HtmlSource} from '../dist'
import cfg from 'find-config';
import fs  from 'fs';
let suite = new Benchmark.Suite()

let monkey = new SeoMonkey();

suite.add('Console output test',{
  'defer':true,
  'fn': function (deferred) {
      let filePath = cfg('test.html', {dir: '/test'})
      monkey.inputSource = new HtmlSource(filePath)
      monkey.saveResultToConsole()
      .then((res) => {
        deferred.resolve();
      })
      .catch(function (err) { throw new Error(err) })
  }
})
.add('saveResultAsFile test',{
  'defer':true,
  'fn': function (deferred) {
      let filePath = cfg('test.html', {dir: '/test'})
      monkey.inputSource = new HtmlSource(filePath)
      monkey.saveResultToFile('demo.txt')
      .then((res) => {
        deferred.resolve();
      })
      .catch(function (err) { throw new Error(err) })
  }
})
.add('saveResultAsStream test',{
  'defer':true,
  'fn': function (deferred) {
      let filePath = cfg('test.html', {dir: '/test'})
      monkey.inputSource = new HtmlSource(filePath)
      let writerStream = fs.createWriteStream('output.txt')
      monkey.saveResultToStream(writerStream)
      .then((res) => {
        deferred.resolve();
      })
      .catch(function (err) { throw new Error(err) })
  }
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
