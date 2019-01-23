var app = require('express')();
var http = require('http').Server(app);
var logger = require('morgan');
var io = require('socket.io')(http);
var cors = require('cors');
var methodOverride = require('method-override');
var api = require('./routes/api.route');
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var user = require('./models/user.model');

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

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// const User = sequelize.define('user', {
//     userID: Sequelize.STRING,
//     userName: Sequelize.STRING,
//     email: Sequelize.STRING
// });
    const User = user;

sequelize.sync()
    .then(() => User.create({
        userID: 'Ran',
        userName: 'dff',
        email: 'jack'
    }))
    .then(user => {
        console.log(user.toJSON());
    });

User.findAll().then(users => {
    console.log(users)
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});