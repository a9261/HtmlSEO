import 'mocha';
import { expect } from 'chai';
import {ConfigModel, MonkeyRule} from '../lib'
import fs from 'fs'
import cfg from 'find-config'
describe('Config Test', () => {
    let _configFileName = 'seomonkey.config.json'

    //Usage example 
    it(' ConfigModel addRule then MonkeyRules count should be 7', () => {
        let data = fs.readFileSync(cfg(_configFileName, {dir: '/'}))
        let config = new ConfigModel(data);
        let rule = new MonkeyRule()
        rule.DetectedText='This is demo rule'
        rule.Maximum = 1 
        rule.Minimum = 1 
        rule.RuleName = 'DemoRule'
        rule.SearchRule='head'
        config.addRule(rule)
        expect(config.MonkeyRules.length).to.equal(7);
     })
     it(' ConfigModel clearAllRule then MonkeyRules count should be zero', () => {
        let data = fs.readFileSync(cfg(_configFileName, {dir: '/'}))
        let config = new ConfigModel(data);
        config.clearAllRule()
        expect(config.MonkeyRules.length).to.equal(0);
     })
    it(' ConfigModel removeRuleAt then MonkeyRules filter MonkeyRule4 should be null', () => {
        let data = fs.readFileSync(cfg(_configFileName, {dir: '/'}))
        let config = new ConfigModel(data);
        config.removeRuleAt(4)
        let result = config.MonkeyRules.filter((item)=>{
            return item.RuleName=='MonkeyRule4'
        })
        expect(result).to.eql([]);
     })
    //End Usage example


    it(' Give wrong parameter to ConfigModel should throw exception', () => {
       expect(function(){
        let config = new ConfigModel('wrong parameter');
       }).to.throw();
    })
   
     it(' ConfigModel addRule , Rule cannot be null', () => {
        let data = fs.readFileSync(cfg(_configFileName, {dir: '/'}))
        let config = new ConfigModel(data);
        expect(()=>{config.addRule()}).to.throw('Rule cannot be null');
     })
     it(' ConfigModel addRule only accept MonkeyRule object parameter', () => {
        let data = fs.readFileSync(cfg(_configFileName, {dir: '/'}))
        let config = new ConfigModel(data);
        expect(()=>{config.addRule('test123')}).to.throw('Parameter should be MonkeyRule');
     })
   
});