const Sequelize = require('sequelize');
const sequelize = require('./chat-app');
const User =  sequelize.define('user', {
    userID: Sequelize.STRING,
    userName: Sequelize.STRING,
    email: Sequelize.STRING,
});

module.exports = User;