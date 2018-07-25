const cfg = require('find-config');
const fs = require('fs');

let filePath = cfg('test.html',{dir:'/test'});
const readableStream = fs.createReadStream(filePath);
let data = '';
readableStream.on('data',function(chunk){
    data+=chunk;
});
readableStream.on('end',function(){
    console.log(data);
})