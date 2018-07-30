import 'mocha';
import {expect, assert} from 'chai';
import HtmlSource from '../lib/Shared/htmlSource'
import StreamSource from '../lib/Shared/streamSource'
import cfg from 'find-config';
import fs  from 'fs';

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
    it('5. Give right parameter for StreamSource should can get right content', (done) => {
        let filePath = cfg('test.html', {dir: '/test'});
        const readableStream = fs.createReadStream(filePath);
        let stream =   new StreamSource(readableStream);
        stream.getSourceData()
        .then(val=>{
            expect(val.indexOf('head') > 0).to.equal(true);
            done();
        })
        .catch(err=>{
            done(err);
        })
    })
    it('6. Give right parameter for HtmlSource should can get right content', (done) => {
        let filePath = cfg('test.html', {dir: '/test'});
        let html =   new HtmlSource(filePath);
        html.getSourceData()
        .then((val)=>{
            expect(val.indexOf('head') > 0).to.equal(true);
            done();
        })
        .catch((err)=>{
            done(err);
        })
        
    })
})