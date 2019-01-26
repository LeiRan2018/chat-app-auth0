var user = require('../models/user.model');
const Sequelize = require('sequelize');
var shortid = require('shortid');

const sequelize = new Sequelize('chat-app', 'root', 'example', {
    dialect: 'mysql',
    host: "127.0.0.1",
    port: 3306,
});

const Logtime = sequelize.define('logtime', {
    logtimeID: Sequelize.STRING,
    userID: Sequelize.STRING,
    login: { type: Sequelize.DATE, allowNull: false },
    logout: Sequelize.DATE

});
const chatRoom = sequelize.define('chatRoom', {
    chatRoomID: Sequelize.STRING
})
const user_chatRoom = sequelize.define('user_chatRoom', {
    user_chatRoomID: Sequelize.STRING,
    userID: Sequelize.STRING,
    chatRoomID: Sequelize.STRING,
})
const User = user;
exports.postlogin = async function (data) {
    try {
      let user = User.findOne({ where: { userName: data.username } }).then(user => {
          
            sequelize.sync()
                .then(() => Logtime.create({
                    logtimeID: shortid.generate(),
                    userID: user.userID,
                    login: Date.now()
                }))
        let roomID = chatRoom.findOne().then(chatRoom => {
                sequelize.sync()
                    .then(() => user_chatRoom.create({
                        user_chatRoomID: shortid.generate(),
                        userID: user.userID,
                        chatRoomID: chatRoom.chatRoomID
                    }))
                return chatRoom;
            })
            return user;

            
        });
        return user;
    }
    catch (e) {
        throw Error('error occured while posting new data');
    }
};
