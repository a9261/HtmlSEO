import BaseSource from './baseSource'
export default class StreamSource extends BaseSource {
    constructor(stream=null){
        super(stream)
        this._valid();
    }
    _valid(){
        if(this.source==null){
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
            // .then((val)=>{
            //     resolve(val);
            //     return val;
            // });
    }   
}