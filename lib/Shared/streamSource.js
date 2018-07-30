import BaseSource from './baseSource'
export default class StreamSource extends BaseSource {
    constructor(stream=null){
        super(stream)
        this._valid();
        if(!this.isValid){
            throw new Error(this.errorMsg);
        }
    }
    _valid(){
        super._valid();
        if(typeof this.source.on != 'function'){
            this.isValid=false;
            this.errorMsg='Wrong StreamSource';
        }
    }
    getSourceData(){
        let data = '';
        let inlineSource = this.source;
        inlineSource.on('data', function (chunk) {
            data += chunk;
        });
        return new Promise(function(resolve){
            inlineSource.on('end',()=>{
                    resolve(data);
                })
            })
    }   
}