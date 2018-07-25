const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const fs = require('fs');
const cfg = require('find-config');
import ConfigModel from './Shared/configModel'
export default class SeoMonkey {
    constructor(configFileName='seomonkey.config.json') {
        //Config Parameter
        this.config;
        this.inputHtmlFiles = [];
        this.inputNodeStreams = [];
        this._configFileName = configFileName;
        this._init();
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
    }
    _checkSourceIsReady() {
        let result = this.inputHtmlFiles.length > 0 || this.inputNodeStreams.length > 0;
        if (!result) {
            throw new Error('All Input source is empty');
        }
    }
    saveResultToConsole() {}
    saveResultAsStream() {}
    saveResultAsFile() {}
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