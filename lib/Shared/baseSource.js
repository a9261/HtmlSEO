

export default class BaseSource {
    constructor(source=null){
        this.isValid = true;
        this.source = source;
        this._valid();
        this.errorMsg = '';
    }
    _valid(){

    }
    getSourceData(){
        
    }
}