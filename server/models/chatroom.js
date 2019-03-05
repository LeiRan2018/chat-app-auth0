const Sequelize = require('sequelize');
const sequelize = require('./chat-app');
const chatroom= sequelize.define('chatRoom', {
    chatRoomID: Sequelize.STRING
});

module.exports = chatroom;