import 'mocha';
import {expect, assert} from 'chai';
require('mocha-sinon');
import SeoMonkey from '../lib/SeoMonkey'
import HtmlSource from '../lib/Shared/htmlSource'
import StreamSource from '../lib/Shared/streamSource'
import cfg from 'find-config';
import fs  from 'fs';


describe('SeoMonkey Test', () => {

  //Create Stub
  beforeEach(function() {
    var log = console.log;
    this.sinon.stub(console, 'log').callsFake(function() {
      return log.apply(log, arguments);
    });
  });

  it('1. After new SeoMonkey , if cannot find config will throw exception', () => {
    expect(function () {
      new SeoMonkey('money.config');
    })
      .to
      .throw()
  })
  it('2. Befor run saveResultToConsole,Empty input will throw exception', () => {
    const monkey = new SeoMonkey();
    expect(() => {
      monkey.saveResultToConsole();
    }).to.throw('Input source is empty');
  })
  it('3. Befor run saveResultToConsole,Wrong html input will throw exception', () => {
    let monkey = new SeoMonkey();
    expect(() => {
      monkey.inputSource = new HtmlSource('');
      monkey.saveResultToConsole();
    })
      .to
      .throw('File extension name is not html');
  })

  it('4. Befor run saveResultToConsole,Wrong html input will throw exception', () => {
    let monkey = new SeoMonkey();
    expect(() => { 
      monkey.inputSource = new HtmlSource('test1.html');
      monkey.saveResultToConsole();
    }).to.throw('File is not exists');
  })

  it('5. Befor run saveResultToConsole function,Wrong stream input will throw exception', () => {
    let monkey = new SeoMonkey();
    expect(() => {
      monkey.inputSource = new StreamSource('a123');
      monkey.saveResultToConsole();
    }).to.throw('Wrong StreamSource');
  })

  it('6. Makesure SeoMonkey input source can get data', (done) => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);

    monkey.inputSource.getSourceData().then((val)=>{
      let hasHtmlTag =val.indexOf('html') > 0;
      expect(hasHtmlTag).to.equal(true);
      done();
    }).catch((err)=>{done(err)});
  })

  it('7. export result to stream, given wrong parameter should throw error', () => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    let wrongInput ='';
    monkey.inputSource = new HtmlSource(filePath);

    expect(() => { monkey.saveResultAsStream(wrongInput) }).to.throw('Only WriteStream can be use');
  })

  it('8. Async Given right parameter, saveResultAsStream should can export result  ', (done) => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);

    let writerStream = fs.createWriteStream('output.txt');
    monkey.saveResultAsStream(writerStream)
      .then((res) => {
        done();
      })
      .catch(function (err) {
        done(err);
      });
  })

  it('9. Async  Given right parameter, saveResultAsFile should can export result  ', (done) => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);
    monkey.saveResultAsFile('demo.txt')
      .then((res) => {
        expect(res).to.equal('write to file done');
        done();
      })
      .catch(function (err) {
        done(err);
      });
  })
  it('10. Wrong Config content should throw exception', () => {
    expect(function () {new SeoMonkey('fake.config.json');}).to.throw()
  })
});