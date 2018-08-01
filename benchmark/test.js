let Benchmark = require('benchmark')
let suite = new Benchmark.Suite()

function t (){
    return new Promise(function(resolve){
        console.log('MonkeyRule1 are match  1 of elements,Mini:1 Max:1');
        resolve();
    })
}
function b (){
    return new Promise(function(resolve){
        console.log('MonkeyRule1 are match  1 of elements,Mini:1 Max:1');
        resolve();
    })
}
suite.add('Console output test',{
    'defer':true,
    'fn':function(deffered){
        t().then(()=>{
            deffered.resolve();
        })
    }
}).add('Console output test',{
    'defer':true,
    'fn':function(deffered){
        t().then(()=>{
            deffered.resolve();
        })
    }
})
.on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });