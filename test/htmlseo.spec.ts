import 'mocha';
import { expect } from 'chai';
import main from '../lib/htmlseo'
describe('Hello function', () => {

  it('should return hello world', () => {
    const result = new main().Run();
    expect(result).to.equal('Running');
  });

});