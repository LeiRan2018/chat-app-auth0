const Sequelize = require('sequelize');

const sequelize = new Sequelize('chat-app', 'root', 'example', {
    dialect: 'mysql',
    host: "127.0.0.1",
    port: 3306,
});

const chatroom = sequelize.define('chatRoom', {
    chatRoomID: Sequelize.STRING
})

const message = sequelize.define('message', {
    messageID: Sequelize.STRING,
    chatRoomID: Sequelize.STRING,
    message: Sequelize.STRING
})

exports.postone = async function (data) {
    try {
        return chatroom.create({
            chatRoomID: data
        });

    } catch (e) {
        throw Error('error occured while posting new data');
    }
};

exports.postone2 = async function (data) {
    try {
        return message.findAll({ where: { chatRoomID: data } })
    }
    catch (e) {
        throw Error('error occured while catching userchat table');
    }
};

exports.exit = async function (chatRoomID) {
    try {
        return chatroom.findOne({ where: { chatRoomID: chatRoomID } });
    }
    catch (e) {
        throw Error('error occured while catching userchat table');
    }
};