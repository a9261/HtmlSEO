import 'mocha';
import {expect, assert} from 'chai';
import SeoMonkey from '../lib/SeoMonkey'
import HtmlSource from '../lib/Shared/htmlSource'
import StreamSource from '../lib/Shared/streamSource'
import {doesNotReject} from 'assert';
import {resolve} from 'path';
const cfg = require('find-config');
const fs = require('fs');

describe('Input Source Test', () => {
    it('1. Create HtmlSource with empty parameter should throw exception', () => {
        expect(function () {
            let x =   new HtmlSource();
        }).to.throw('Source parameter cannot be null')
    })
    it('2. Create StreamSource with empty parameter should throw exception', () => {
        expect(function () {
            let x =   new StreamSource();
        }).to.throw('Source parameter cannot be null')
    })
    it('3. CreateHtmlSource with worong parameter should throw exception', () => {
        expect(function () {
            let x =   new HtmlSource('a123');
        }).to.throw('File extension name is not html')
    })
    it('4. Create StreamSource with worong parameter should throw exception', () => {
        expect(function () {
            let x =   new StreamSource('a123');
        }).to.throw('Wrong StreamSource')
    })
})