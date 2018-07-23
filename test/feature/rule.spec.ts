import Rule from '../../lib/feature/rule'
import 'mocha';
import { expect } from 'chai';
describe('Rule Class', () => {

    it('should return hello world', () => {
      const result = new Rule().validation();
      expect(result).to.equal('Running');
    });
  
  });