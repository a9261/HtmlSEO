import BaseSource from './baseSource'
import path from 'path';
import fs  from 'fs';
export default class HtmlSource extends BaseSource {
    constructor(filePath=null){
        super(filePath)
        this._valid();
        if(!this.isValid){
            throw new Error(this.errorMsg);
        }
    }
    _valid(){
        super._valid();
        if (path.extname(this.source) !== '.html'){
            this.isValid=false;
            this.errorMsg = 'File extension name is not html';
            return;
        } 
        if (!fs.existsSync(this.source)) {
            this.isValid=false;
            this.errorMsg = 'File is not exists';
        }
    }
    getSourceData(){
        let data = fs.readFileSync(this.source);
        return new Promise((resolve)=>{
            resolve(data.toString());
        });
    }   
}