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
        return User.findOne({ where: { userName: data.username } })
    }
    catch (e) {
        throw Error('error occured while getting user info');
    }
};

exports.postlogin2 = async function () {
    try {
        return chatRoom.findOne();
    }
    catch (e) {
        throw Error('error occured while getting broadcast room');
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
        throw Error('error occured while getting all messages from broadcast room');
    }
};

exports.postlogin5 = async function () {
    try {
        return user.findAll();
    }
    catch (e) {
        throw Error('error occured while getting user list');
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
        throw Error('error occured while logging out');
    }
}
