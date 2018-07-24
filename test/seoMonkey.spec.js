import 'mocha';
import { expect } from 'chai';
import SeoMonkey from '../lib/SeoMonkey'
describe('SeoMonkey class Test', () => {
  it('should return hello world', () => {
    const result = new SeoMonkey().Run();
    expect(result).to.equal('Running');
  });

});