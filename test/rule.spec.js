import 'mocha';
import { expect } from 'chai';
import {MonkeyRule} from '../lib/Shared/configModel'
import cfg from 'find-config';
import fs from 'fs';
describe('Rule Test', () => {
    it('1. Give rule pattern maximum less then 0 should throw exception', () => {
       let data = fs.readFileSync(cfg('seomonkey.config.json', {dir: '/'}))
       let configRules = JSON.parse(data.toString()).MonkeyRules;
       let rule = new MonkeyRule();
       rule = Object.assign(new MonkeyRule(),configRules[0]);
       expect(function(){
            rule.Maximum=-1;
            rule.valid();
       }).to.throw(`The Rule ${rule.RuleName} Minimum or Maximum cannot less than 0`);
    })
    it('2. Give rule pattern minimum less then 0 should throw exception', () => {
        let data = fs.readFileSync(cfg('seomonkey.config.json', {dir: '/'}))
        let configRules = JSON.parse(data.toString()).MonkeyRules;
        let rule = new MonkeyRule();
        rule = Object.assign(new MonkeyRule(),configRules[0]);
        expect(function(){
             rule.Minimum=-1;
             rule.valid();
        }).to.throw(`The Rule ${rule.RuleName} Minimum or Maximum cannot less than 0`);
     })
     it('3. Give rule pattern Minimum more than Maximum should throw exception', () => {
        let data = fs.readFileSync(cfg('seomonkey.config.json', {dir: '/'}))
        let configRules = JSON.parse(data.toString()).MonkeyRules;
        let rule = new MonkeyRule();
        rule = Object.assign(new MonkeyRule(),configRules[0]);
        expect(function(){
             rule.Minimum=10;
             rule.Maximum=1;
             rule.valid();
        }).to.throw(`The Rule ${rule.RuleName} Minimum cannot more than Maximum`);
     })
     it('4. Give rule pattern SearchRule empty should throw exception', () => {
        let data = fs.readFileSync(cfg('seomonkey.config.json', {dir: '/'}))
        let configRules = JSON.parse(data.toString()).MonkeyRules;
        let rule = new MonkeyRule();
        rule = Object.assign(new MonkeyRule(),configRules[0]);
        expect(function(){
             rule.SearchRule='';
             rule.valid();
        }).to.throw(`The Rule ${rule.RuleName} SearchRule cannot empty`);
     })
});