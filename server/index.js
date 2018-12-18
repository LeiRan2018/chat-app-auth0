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

    socket.on('disconnect', function () {
        console.log('disconnected');
    });

    socket.on('message', (msg) => {
        // var chat = fs.readFileSync('content1.txt').toString();
        // var old_data = JSON.parse(chat);
        // for (var i = 0; i < old_data.length; i++) {
        //     old_data[i].content.push(msg);
        // }

        // fs.truncateSync('content1.txt');
        // fs.writeFileSync('content1.txt', JSON.stringify(old_data));
        console.log('message: ' + msg['meg'] + " userid: " + msg['userid']);
        io.emit('message', msg);
    })
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});