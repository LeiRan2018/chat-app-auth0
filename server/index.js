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
app.get('/', function(req, res) {
    res.sendfile('index.html');
 });
 var room = "abc123";
io.on('connection', function (socket) {
    
    // var userid = shortid.generate();
    // console.log('uesrid: ' + userid + ' conected');

    socket.on('disconnect', function () {
        console.log('disconnected');
    });

    socket.join(room);
    io.sockets.in(room).emit('one-one',"room");

    socket.on('message', (msg) => {
        // msg['time'] = new Date().toLocaleString();
        var chat = fs.readFileSync('content1.txt').toString();
        var old_data = JSON.parse(chat);
        for (var i = 0; i < old_data.length; i++) {
            old_data[i].content.push(msg);
        }
        // var found = old_data.find(el => {
        //     return el.userid == msg.userid;
        // })
        // if (found != undefined) {
        //     var index = old_data.findIndex(el => {
        //         return el.userid == msg.userid;
        //     })

        fs.truncateSync('content1.txt');
        fs.writeFileSync('content1.txt', JSON.stringify(old_data));
        console.log('message: ' + msg['meg'] + " userid: " + msg['userid']);

        // } else {
        //     // var data = msg; 
        //     // delete data.userid;
        //     var new_data = { "userid": msg['userid'], "content": [msg] };
        //     old_data.push(new_data);
        //     fs.truncateSync('content1.txt');
        //     fs.writeFileSync('content1.txt', JSON.stringify(old_data));
        //     console.log('message: ' + msg['meg'] + " userid: " + msg['userid']);

        // }

        io.emit('message', msg);


    })
});

// io.sockets.in(room).emit("one-one", 'fine');
http.listen(3000, function () {
    console.log('listening on *:3000');
});