import BaseSource from './baseSource'
import {_valid} from './baseSource'
const valid = Symbol('_valid');
export default class StreamSource extends BaseSource {
    constructor(stream=null){
        super(stream)
        
        this[valid]();
        if(!this.isValid){
            throw new Error(this.errorMsg);
        }
    }
    [valid](){
        // super._valid();
        super[_valid]();
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