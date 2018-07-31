import 'mocha';
import { expect } from 'chai';
import {ConfigModel} from '../lib'
import fs from 'fs'
import cfg from 'find-config'
describe('Config Test', () => {
    let _configFileName = 'seomonkey.config.json'
    it('1. Give wrong parameter to ConfigModel should throw exception', () => {
       expect(function(){
        let config = new ConfigModel('wrong parameter');
       }).to.throw();
    })
    it('2. ConfigModel clearAllRule then MonkeyRules count should be zero', () => {
        let data = fs.readFileSync(cfg(_configFileName, {dir: '/'}))
        let config = new ConfigModel(data);
        config.clearAllRule()
        expect(config.MonkeyRules.length).to.equal(0);
     })
    //  it('3. ConfigModel addRule then MonkeyRules count should be 7', () => {
    //     let data = fs.readFileSync(cfg(_configFileName, {dir: '/'}))
    //     let config = new ConfigModel(data);
    //     config.addRule()
    //     expect(config.MonkeyRules.length).to.equal(0);
    //  })
    //  it('4. ConfigModel addRule then MonkeyRules count should be 7', () => {
    //     let data = fs.readFileSync(cfg(_configFileName, {dir: '/'}))
    //     let config = new ConfigModel(data);
    //     config.addRule()
    //     expect(config.MonkeyRules.length).to.equal(0);
    //  })
    //  it('5. ConfigModel addRule then MonkeyRules count should be 7', () => {
    //     let data = fs.readFileSync(cfg(_configFileName, {dir: '/'}))
    //     let config = new ConfigModel(data);
    //     config.addRule()
    //     expect(config.MonkeyRules.length).to.equal(0);
    //  })
    //  it('6. ConfigModel removeRuleAt then MonkeyRules filter MonkeyRule4 should be null', () => {
    //     let data = fs.readFileSync(cfg(_configFileName, {dir: '/'}))
    //     let config = new ConfigModel(data);
    //     config.removeRuleAt()
    //     expect(config.MonkeyRules.length).to.equal(0);
    //  })
});