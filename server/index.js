var app = require('express')();
var http = require('http').Server(app);
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

const user = require('./models/user');

const user_chatRoom = require('./models/user-chat');

const chatRoom = require('./models/chatroom');

const message = require('./models/message');

user.sync();
user_chatRoom.sync();
message.sync();

//create a broadcast room if there is no room in chatRoom
chatRoom.sync()
    .then(() => chatRoom.findOne().then(value => {
        if (value) {
            console.log("roomID: " + value.chatRoomID)
        }
        else {
            chatRoom.create({
                chatRoomID: shortid.generate()
            })
        }
    }))
// socket io to detect message sent from frontend and send back to frontend
io.on('connection', function (socket) {

    socket.on('disconnect', function () {
        console.log('disconnected');
    });

    socket.on('add-message', (data) => {
        console.log(Object.keys(socket.rooms))
        console.log(data)
        //send message to user in this room
        io.to(data.room).emit('message', data);
    });
    //determine user room id 
    socket.on('room', (data) => {
        let rooms = Object.keys(socket.rooms);
        console.log(socket.rooms);
        if (rooms.length === 2 && rooms[1] != data) {
            console.log(rooms[0] + ' change room to ' + data);
            socket.leave(rooms[1]);
            socket.join(data);
        } else {
            console.log(rooms[0] + ' join room in ' + data);
            socket.join(data)
        };
    })
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});