var app = require('express')();
var http = require('http').Server(app);
var logger = require('morgan');
var io = require('socket.io')(http);
var cors = require('cors');
var methodOverride = require('method-override');
var api = require('./routes/api.route');
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var shortid = require('shortid');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
app.use('/api', api);

const sequelize = new Sequelize('chat-app', 'root', 'example', {
    dialect: 'mysql',
    host: "127.0.0.1",
    port: 3306,
});


io.on('connection', function (socket) {

    socket.on('disconnect', function () {
        console.log('disconnected');
    });

    socket.on('message', (msg) => {
        console.log('message: ' + msg['meg'] + " userid: " + msg['userid']);
        io.emit('message', msg);
    })
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});