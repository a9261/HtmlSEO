import 'mocha';
import { expect } from 'chai';
import ConfigModel from '../lib/Shared/configModel'
describe('Config Test', () => {
    it('1. Give wrong parameter to ConfigModel should throw exception', () => {
       expect(function(){
        let config = new ConfigModel('wrong parameter');
       }).to.throw();
    })
});