import 'mocha';
import {expect, assert} from 'chai';
import SeoMonkey from '../lib/SeoMonkey'
import {doesNotReject} from 'assert';
import { resolve } from 'path';
const cfg = require('find-config');
const fs = require('fs');

describe('SeoMonkey class Test', () => {

  it('After new SeoMonkey , if cannot find config will throw exception', () => {
    expect(function () {
      new SeoMonkey('money.config');
    })
      .to
      .throw()
  })
  it('Befor run private detect function,Empty input will throw exception', () => {
    const monkey = new SeoMonkey();
    // expect(result).to.equal(false);
    expect(() => {
      monkey._detect()
    })
      .to
      .throw('All Input source is empty');
  })

  it('Async Execute private _detect,input example html file ,result should have Rule1', (done) => {
    let monkey = new SeoMonkey();
    //Full Path and Relative Path..
    let filePath = cfg('test.html', {dir: '/test'});
    // monkey.inputHtmlFiles.push('test/test.html');
    monkey
      .inputHtmlFiles
      .push(filePath);
    let result = monkey._detect();
    result.then(function(val){
      
      let msg =val[0][0]; 
      console.log(msg);
      expect(msg)
      .to
      .equal('MonkeyRule12 are match  1 of elements,Mini:1 Max:1');
      done();
    })
    // .catch(function(){done()});
    .catch(function(err){done(err);});
    
    // return result[0][0].should.eventually.equal('MonkeyRule1 are match  1 of elements,Mini:1 Max:1');
  })

  it('Async Execute private _detect,input example stream ,result should have Rule1', (done) => {
    let monkey = new SeoMonkey();
    //Full Path and Relative Path..
    let filePath = cfg('test.html', {dir: '/test'});
    const readableStream = fs.createReadStream(filePath);
    monkey
      .inputNodeStreams
      .push(readableStream);
    let result = monkey._detect();
   return  result.then((res) => {
      expect(res[0])
        .to
        .equal('MonkeyRule1 are match  1 of elements,Mini:1 Max:1');
    }).then(done,done);
  })

  it('Async Execute private _detect,input example html file, export result to console', (done) => {
    let monkey = new SeoMonkey();
    let filePath = cfg('test.html', {dir: '/test'});
    monkey
      .inputHtmlFiles
      .push(filePath);
   return monkey
      .saveResultToConsole()
      .then((res) => {
        expect(res)
          .to
          .equal('MonkeyRule1 are match  1 of elements,Mini:1 Max:1');
      }).then(done,done);
  })
  //未寫案例 檢查輸入的內容是否真的為該類型 e.g. 如果輸入的是Html File 那應該內容均為檔案位置，且副檔名為.html
});