const Sequelize = require('sequelize');
const sequelize = require('./chat-app');
const User_chat =  sequelize.define('user_chatRoom', {
    user_chatRoomID: Sequelize.STRING,
    userID: Sequelize.STRING,
    chatRoomID: Sequelize.STRING,
});

module.exports = User_chat;