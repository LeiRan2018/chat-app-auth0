var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');
var logger = require('morgan');
var io = require('socket.io')(http);
var cors = require('cors');
var methodOverride = require('method-override');
var api = require('./routes/api.route');
var bodyParser = require('body-parser');
var shortid = require('shortid');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
app.use('/api', api);

io.on('connection', function (socket) {
    // var userid = shortid.generate();
    // console.log('uesrid: ' + userid + ' conected');

    socket.on('disconnect', function () {
        console.log('disconnected');
    });

    socket.on('message', (msg) => {
        msg['time'] = new Date().toLocaleString();
        var chat = fs.readFileSync('content.txt').toString();
        var old_data = JSON.parse(chat);
        var found = old_data.find(el => {
            return el.userid == msg.userid;
        })
        if (found != undefined) {
            var index = old_data.findIndex(el => {
                return el.userid == msg.userid;
            })
            old_data[index].content.push(msg);
            fs.truncateSync('content.txt');
            fs.writeFileSync('content.txt', JSON.stringify(old_data));
            
        } else {

            /** console.log('message: ' + msg['meg'] + " userid: " + msg['userid']);*/

            
        }
        io.emit('message', msg);
    })
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});