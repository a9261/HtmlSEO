import 'mocha';
import { expect,assert } from 'chai';
import SeoMonkey from '../lib/SeoMonkey'
describe('SeoMonkey class Test', () => {
  
  it('After new SeoMonkey , if cannot find config will throw exception', () => {
    expect(function(){ new SeoMonkey('money.config'); }).to.throw()
  })
  it('Befor run private detect function,Empty input will throw exception', () => {
    const monkey = new SeoMonkey();
    // expect(result).to.equal(false);
    expect(()=>{monkey._detect()}).to.throw('All Input source is empty');
  })

});