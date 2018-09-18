var fs = require('fs');
var test1 = fs.readFileSync('data.txt', 'utf8', (err, data) => {
    if(err) throw err;
    // data.forEach(element => {
    //     if(element.userid == id) {
    //         var chat = element;
    //         return chat
    //     }
    // });
    return data;
}) 
var chat = JSON.parse(test1);
var test ;
chat.forEach(element => {
    if(element.userid == 0) {
        test = element;
    }
});
console.log(test)