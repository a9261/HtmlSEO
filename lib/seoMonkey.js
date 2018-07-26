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
        this.config = null;
        this.inputSource = null;
        this._configFileName = configFileName;
        this._init();
    }
    _init() {
        //Read Config File
        try {
            let data = fs.readFileSync(cfg(this._configFileName, {dir: '/'}))
            this.config = new ConfigModel(JSON.parse(data));
        } catch (error) {
            // throw new Error(error);
            throw new Error('Cannot find config file , Monkey is crazy');
        }
    }
    _detect() {
        this._checkSourceIsReady();
        let dr = new DetectDr(this.config);
        let result = dr.detect(this.inputSource);
        return result;
    }
    _checkSourceIsReady() {
        if (this.inputSource == null) {
            throw new Error('Input source is empty');
        }
        if (!this.inputSource.isValid) {
            throw new Error(this.inputSource.errorMsg);
        }
    }
    saveResultToConsole() {
        return this._detect().then((resultMsg) => {
            resultMsg.forEach(msg=>{
                console.log(msg);
            })
            return resultMsg;
        })
    }
    saveResultAsStream(targetStream=null) {
        if(targetStream==null){
            throw new Error('Target stream is require');
            return;
        }
        if(targetStream.constructor!=fs.WriteStream){
            throw new Error('Only WriteStream can be use');
            return;
        }
        let t = this;
        return new Promise((resolve,reject)=>{
            t._detect().then((resultMsg) => {
                let inputMsg = '';
                resultMsg.forEach(msg=>{
                   inputMsg = inputMsg + msg + '\r\n'
                })
                targetStream.write(inputMsg,'UTF8');
                targetStream.end();
                targetStream.on('finish', function() {
                   resolve(targetStream)
                });
                targetStream.on('error', function(err){
                    reject(err);
                 });
            });
        });
    }
    saveResultAsFile(outputPath) {
        return this._detect().then((resultMsg) => {
            let inputMsg = '';
            resultMsg.forEach(msg=>{
            inputMsg = inputMsg + msg + '\r\n'
            });
            fs.writeFileSync(outputPath,inputMsg);
            return ('write to file done');
        });
    }
    _chkDirectory(path){

        return new Promise((resolve,reject)=>{
            fs.stat(path,function(err,stats){
                if(err && err.errno===34){
                    fs.mkdir(path);
                    resolve();
                }else{
                    reject('path is wrong');
                }
            })
        });
    }
}
