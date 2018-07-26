import 'mocha';
import {expect, assert} from 'chai';
import SeoMonkey from '../lib/SeoMonkey'
import HtmlSource from '../lib/Shared/htmlSource'
import StreamSource from '../lib/Shared/streamSource'
import {doesNotReject} from 'assert';
import {resolve} from 'path';
const cfg = require('find-config');
const fs = require('fs');

describe('SeoMonkey Test ', () => {

  it('1. After new SeoMonkey , if cannot find config will throw exception', () => {
    expect(function () {
      new SeoMonkey('money.config');
    })
      .to
      .throw()
  })
  it('2. Befor run private detect function,Empty input will throw exception', () => {
    const monkey = new SeoMonkey();
    // expect(result).to.equal(false);
    expect(() => {
      monkey._detect()
    })
      .to
      .throw('Input source is empty');
  })
  it('3. Befor run private detect function,Wrong html input will throw exception', () => {
    let monkey = new SeoMonkey();
    monkey.inputSource = new HtmlSource('');
    // expect(result).to.equal(false);
    expect(() => {
      monkey._detect()
    })
      .to
      .throw('File extension name is not html');
  })

  it('4. Befor run private detect function,Wrong html input will throw exception', () => {
    let monkey = new SeoMonkey();
    monkey.inputSource = new HtmlSource('test1.html');
    // expect(result).to.equal(false);
    expect(() => { monkey._detect()}).to.throw('File is not exists');
  })

  it('5. Befor run private detect function,Wrong stream input will throw exception', () => {
    let monkey = new SeoMonkey();
    monkey.inputSource = new StreamSource();
    expect(() => {monkey._detect()}).to.throw('Wrong StreamSource');
  })

  it('6. Makesure input source can get data', (done) => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);

    monkey.inputSource.getSourceData().then((val)=>{
      let hasHtmlTag =val.indexOf('html') > 0;
      expect(hasHtmlTag).to.equal(true);
      done();
    }).catch((err)=>{done(err)});
  })

  it('7. Async Execute private _detect,input example html file ,result should have Rule1', (done) => {
    let monkey = new SeoMonkey();
    //Full Path and Relative Path..
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);

    let result = monkey._detect();
    result.then(function (val) {
      let msg = val[0];
      expect(msg).to.equal('MonkeyRule1 are match  1 of elements,Mini:1 Max:1');
      done();
    })
    // .catch(function(){done()}); 錯誤寫法，未帶入err msg 視同pass
      .catch(function (err) {
        done(err);
      });
  })

  it('8. Async Execute private _detect,input example stream ,result should have Rule1', (done) => {
    let monkey = new SeoMonkey();
    //Full Path and Relative Path..
    let filePath = cfg('test.html', {dir: '/test'});
    const readableStream = fs.createReadStream(filePath);
    monkey.inputSource = new StreamSource(readableStream);

    let result = monkey._detect();
    result.then((res) => {
      expect(res[0]).to.equal('MonkeyRule1 are match  1 of elements,Mini:1 Max:1');
      done();
    })
      .catch(function (err) {
        done(err);
      });
  })

  it('9. Async Execute private _detect,input example html file, export result to console', (done) => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    monkey.inputSource = new HtmlSource(filePath);

    monkey.saveResultToConsole()
      .then((res) => {
        expect(res[0]).to.equal('MonkeyRule1 are match  1 of elements,Mini:1 Max:1');
        done();
      })
      .catch(function (err) {
        done(err);
      });
  })

  it('10. export result to stream, given wrong parameter should throw error', () => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    let wrongInput ='';
    monkey.inputSource = new HtmlSource(filePath);

    expect(() => { monkey.saveResultAsStream(wrongInput) }).to.throw('Only WriteStream can be use');
  })

  it('11. Async Execute private _detect,input example html file, export result to stream', (done) => {
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

  it('12. Async Execute private _detect,input example html file, export result to file', (done) => {
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
});