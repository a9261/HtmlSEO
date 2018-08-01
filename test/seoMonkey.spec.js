import 'mocha';
import {expect, assert} from 'chai';
import sinon from 'sinon'
import SeoMonkey,{HtmlSource,StreamSource, MonkeyRule} from '../lib'
import cfg from 'find-config';
import fs  from 'fs';
describe('SeoMonkey Test', () => {
  //Usage example
  
  
  it('. Async Given right parameter, saveResultAsStream should can export result  ', (done) => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);

    let writerStream = fs.createWriteStream('output.txt');
    monkey.saveResultToStream(writerStream)
      .then((res) => {
        done();
      })
      .catch(function (err) {
        done(err);
      });
  })

  it('. Async  Given right parameter, saveResultAsFile should can export result  ', (done) => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);
    monkey.saveResultToFile('demo.txt')
      .then((res) => {
        expect(res).to.equal('write to file done');
        done();
      })
      .catch(function (err) {
        done(err);
      });
  })
  it('. Async  Given right StreamSource , saveResultToConsole should can export result  ', (done) => {
    let monkey = new SeoMonkey();
    let spy = sinon.spy(console,'log');
    let filePath = cfg('test.html', {dir: '/test'});
    const readableStream = fs.createReadStream(filePath);
    let stream =   new StreamSource(readableStream);
    monkey.inputSource = stream;
    monkey.saveResultToConsole()
      .then((res) => {
        expect(spy.called).to.equal(true);
        done();
        spy.restore();
      })
      .catch(function (err) {
        done(err);
      });
  })
  it('. Async  Given right parameter, saveResultToConsole should can export result  ', (done) => {
    let monkey = new SeoMonkey();
    let spy = sinon.spy(console,'log');
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);
    monkey.saveResultToConsole()
      .then((res) => {
        expect(spy.called).to.equal(true);
        done();
        spy.restore();
      })
      .catch(function (err) {
        done(err);
      });
  })

  it('. clearAllRule, saveResultToConsole should export empty result  ', (done) => {
    let monkey = new SeoMonkey();
    monkey.config.clearAllRule();

    let spy = sinon.spy(console,'log');
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);
    monkey.saveResultToConsole()
      .then((res) => {
        // Because Rule is empty so no result can be export
        expect(spy.called).to.equal(false); 
        done();
        spy.restore();
      })
      .catch(function (err) {
        done(err);
      });
  })

  it('. addRule, saveResultToConsole should export 7 result  ', (done) => {
    let monkey = new SeoMonkey();
    let rule = new MonkeyRule();
    rule.DetectedText='Hello';
    rule.Maximum=1;
    rule.Minimum=1;
    rule.RuleName='This is new Rule';
    rule.SearchRule='head'
    monkey.config.addRule(rule);
    
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);
    monkey.saveResultToConsole()
      .then((res) => {
        expect(res.length).to.equal(7); 
        done();
      })
      .catch(function (err) {
        done(err);
      });
  })
  it('. removeRuleAt 4, the result should not find MonkeyRule4  ', (done) => {
    let monkey = new SeoMonkey();
    monkey.config.removeRuleAt(4);
    
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);
    monkey.saveResultToConsole()
      .then((res) => {
        let result = monkey.config.MonkeyRules.filter((item)=>{
          return item.RuleName=='MonkeyRule4'
      })
      expect(result).to.eql([]);
        done();
      })
      .catch(function (err) {
        done(err);
      });
  })
  //End Usage example

  it('. After new SeoMonkey , if cannot find config will throw exception', () => {
    expect(function () {
      new SeoMonkey('money.config');
    })
      .to
      .throw()
  })
  it('. Befor run saveResultToConsole,Empty input will throw exception', () => {
    const monkey = new SeoMonkey();
    expect(() => {
      monkey.saveResultToConsole();
    }).to.throw('Input source is empty');
  })
  it('. Befor run saveResultToConsole,Wrong html input will throw exception', () => {
    let monkey = new SeoMonkey();
    expect(() => {
      monkey.inputSource = new HtmlSource('');
      monkey.saveResultToConsole();
    })
      .to
      .throw('File extension name is not html');
  })

  it('. Befor run saveResultToConsole,Wrong html input will throw exception', () => {
    let monkey = new SeoMonkey();
    expect(() => { 
      monkey.inputSource = new HtmlSource('test1.html');
      monkey.saveResultToConsole();
    }).to.throw('File is not exists');
  })

  it('. Befor run saveResultToConsole function,Wrong stream input will throw exception', () => {
    let monkey = new SeoMonkey();
    expect(() => {
      monkey.inputSource = new StreamSource('a123');
      monkey.saveResultToConsole();
    }).to.throw('Wrong StreamSource');
  })

  it('. Makesure SeoMonkey input source can get data', (done) => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);

    monkey.inputSource.getSourceData().then((val)=>{
      let hasHtmlTag =val.indexOf('html') > 0;
      expect(hasHtmlTag).to.equal(true);
      done();
    }).catch((err)=>{done(err)});
  })
it('. export result to File ,if parameter is empty should throw error  ', () => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);
    expect(() => { monkey.saveResultToFile() }).to.throw('outputPath cannot null');
  })
  it('. export result to stream, given wrong parameter should throw error', () => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    let wrongInput ='';
    monkey.inputSource = new HtmlSource(filePath);

    expect(() => { monkey.saveResultToStream(wrongInput) }).to.throw('Only WriteStream can be use');
  })
  it('. Wrong Config content should throw exception', () => {
    expect(function () {new SeoMonkey('fake.config.json');}).to.throw()
  })
});