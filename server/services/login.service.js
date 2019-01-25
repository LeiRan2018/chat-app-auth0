var fs = require('fs');
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
    userID: Sequelize.INTEGER,
    login: { type: Sequelize.DATE, allowNull: false },
    logout: Sequelize.DATE

});

const User = user;
exports.postlogin = async function (data) {
    try {
        User.findOne({ where: { userName: data.username } }).then(user => {
            sequelize.sync()
            .then(() => Logtime.create({
                logtimeID: shortid.generate(),
                userID: user.id,
                login: Date.now()
            }))
        });
    }
    catch (e) {
        throw Error('error occured while posting new data');
    }
};
