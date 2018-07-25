const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const fs = require('fs');
const cfg = require('find-config');
const path = require('path');
import ConfigModel from './Shared/configModel'
export default class SeoMonkey {
    constructor(configFileName = 'seomonkey.config.json') {
        //Config Parameter
        this.config;
        this.inputHtmlFiles = [];
        this.inputNodeStreams = [];
        this._configFileName = configFileName;
        this._init();
        this.fullMsg = [];
    }
    _init() {
        //Read Config File
        try {
            let data = fs.readFileSync(cfg(this._configFileName, {dir: '/'}))
            // this.config = JSON.parse(data)
            this.config = new ConfigModel(JSON.parse(data));
        } catch (error) {
            throw new Error(error);
            // throw new Error('Cannot find config file , Monkey is crazy');
        }
    }
    _detect() {
        this._checkSourceIsReady();

        let fileDetectResult = this._detectHtmlFile(this.inputHtmlFiles);
        let streamDetectResult = this._detectStream(this.inputNodeStreams);
        // this.fullMsg = this     .fullMsg     .concat(fileDetectResult)
        // .concat(streamDetectResult);
        return Promise.all([fileDetectResult, streamDetectResult]);
        // return this.fullMsg;
    }
    _detectHtmlFile(files) {
        //lodash _.flow
        let msg = [];
        let result = files.map((filePath) => {
            let data = fs.readFileSync(filePath);
            const doc = new JSDOM(data).window.document;
            this
                .config
                .MonkeyRules
                .map((rule) => {
                    let detectNum = doc
                        .querySelectorAll(rule.SearchRule)
                        .length;
                    let fullMsg = rule.DetectedText.length > 0
                        ? rule.DetectedText
                        : this.config.DetectedText;
                    fullMsg = fullMsg
                        .replace("{RuleName}", rule.RuleName)
                        .replace("{Num}", detectNum)
                        .replace("{Minimum}", rule.Minimum)
                        .replace("{Maximum}", rule.Maximum);
                    if (detectNum < rule.Minimum || detectNum > rule.Maximum) {
                        fullMsg = '[Warning] ' + fullMsg;
                    }
                    msg.push(fullMsg);
                });
        });
        return msg;
    }
    _detectStream(streams) {
        //lodash _.flow
        let msg = [];
        let result = streams.map((stream) => {
            let data = '';
            stream.on('data', function (chunk) {
                data += chunk;
            });
            stream.on('end', function () {
                const doc = new JSDOM(data).window.document;
                this
                    .config
                    .MonkeyRules
                    .map((rule) => {
                        let detectNum = doc
                            .querySelectorAll(rule.SearchRule)
                            .length;
                        let fullMsg = rule.DetectedText.length > 0
                            ? rule.DetectedText
                            : this.config.DetectedText;
                        fullMsg = fullMsg
                            .replace("{RuleName}", rule.RuleName)
                            .replace("{Num}", detectNum)
                            .replace("{Minimum}", rule.Minimum)
                            .replace("{Maximum}", rule.Maximum);
                        if (detectNum < rule.Minimum || detectNum > rule.Maximum) {
                            fullMsg = '[Warning] ' + fullMsg;
                        }
                        msg.push(fullMsg);
                    });
            });
        });
        return msg;
    }
    _checkSourceIsReady() {
        let result = this.inputHtmlFiles.length > 0 || this.inputNodeStreams.length > 0;
        if (!result) {
            throw new Error('All Input source is empty');
        }
        let chkHtmlSource = this
            .inputHtmlFiles
            .filter((filePath) => {
                if (path.extname(filePath) !== '.html') 
                    return filePath;
                if (!fs.existsSync(filePath)) {
                    return filePath;
                }
            });
        if (chkHtmlSource.length > 0) {
            throw new Error('HtmlSource has wrong file or path');
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