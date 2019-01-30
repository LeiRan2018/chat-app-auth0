var user = require('../models/user.model');
const Sequelize = require('sequelize');
var shortid = require('shortid');

const sequelize = new Sequelize('chat-app', 'root', 'example', {
    dialect: 'mysql',
    host: "127.0.0.1",
    port: 3306,
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

const message = sequelize.define('message',{
    messageID: Sequelize.STRING,
    chatRoomID: Sequelize.STRING,
    message: Sequelize.STRING
})

exports.postlogin = async function (data) {
    try {
        let user = User.findOne({ where: { userName: data.username } }).then(user => {

            chatRoom.findOne().then(chatRoom => {
                sequelize.sync()
                    .then(() => user_chatRoom.create({
                        user_chatRoomID: shortid.generate(),
                        userID: user.userID,
                        chatRoomID: chatRoom.chatRoomID
                    }))
            })
            return user;
        });
        return user;
    }
    catch (e) {
        throw Error('error occured while posting new data');
    }
};

exports.postlogin2 = async function () {
    try {
        let userchat = chatRoom.findOne();
        return userchat;
    }
    catch (e) {
        throw Error('error occured while catching userchat table');
    }
};

exports.postlogin3 = async function (data) {
    try {
        return user_chatRoom.findAll({where: {userID: data}})
    }
    catch (e) {
        throw Error('error occured while catching userchat table');
    }
};

exports.postlogin4 = async function (data) {
    try {
        return message.findAll({where: {chatRoomID: data}})
    }
    catch (e) {
        throw Error('error occured while catching userchat table');
    }
};

exports.postlogin5 = async function () {
    try {
        return user.findAll();
    }
    catch (e) {
        throw Error('error occured while catching user list');
    }
}

exports.postlogout = async function (data) {
    try {
        // console.log(data + 'wefewfweijfwef');
        user_chatRoom.findOne(
            {
                where: { userID: data.userid },
                order: [['createdAt', 'DESC']]
            }
        ).then(value => {
            user_chatRoom.update(
                { updatedAt: Date.now() },
                { where: { user_chatRoomID: value.user_chatRoomID } }
            )
        })

    } catch (e) {

    }
}
