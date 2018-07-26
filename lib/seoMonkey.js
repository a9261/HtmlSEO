const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const fs = require('fs');
const cfg = require('find-config');
const path = require('path');
import DetectDr from './feature/detectDr'
import ConfigModel from './Shared/configModel'
export default class SeoMonkey {
    constructor(configFileName = 'seomonkey.config.json') {
        //Config Parameter
        this.config=null;
        this.inputHtmlFiles = [];
        this.inputNodeStreams = [];
        this.inputSource=null;
        this._configFileName = configFileName;
        this._init();
        this.fullMsg = [];
    }
    _init() {
        //Read Config File
        try {
            let data = fs.readFileSync(cfg(this._configFileName, {dir: '/'}))
            this.config = new ConfigModel(JSON.parse(data));
        } catch (error) {
            throw new Error(error);
            // throw new Error('Cannot find config file , Monkey is crazy');
        }
    }
    _detect() {
        this._checkSourceIsReady();
        let dr = new DetectDr(this.config);
        let result =  dr.detect(this.inputSource);
        return result;
    } 
    _checkSourceIsReady() {
        if(this.inputSource==null){
            throw new Error('Input source is empty');
        }
        if(!this.inputSource.isValid){
            throw new Error(this.inputSource.errorMsg);
        }
    }
    saveResultToConsole() {
        return new Promise(resolve=>{
            let msg='test';
            console.log(msg);
            resolve(msg);
        });
    }
    saveResultAsStream() {

    }
    saveResultAsFile() {

    }
    run() {
        let demoContent = `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<div>
<h1>This is a Heading</h1>
<h1>This is a Heading</h1>
<h1>This is a Heading</h1>
</div>
</body>
</html>`;

        const doc = new JSDOM(demoContent).window.document;
        return doc
            .querySelectorAll('h1')
            .length;
    }
}
let m = new SeoMonkey();
// console.log(m.run());