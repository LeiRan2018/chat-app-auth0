var shortid = require('shortid');
const Sequelize = require('sequelize');

const sequelize  = new Sequelize('chat-app', 'root', 'example', {
    dialect: 'mysql',
    host: "127.0.0.1",
    port: 3306,
});

const message = sequelize.define('message',{
    messageID: Sequelize.STRING,
    chatRoomID: Sequelize.STRING,
    message: Sequelize.STRING
})

exports.postone = async function (data) {
    try {
        
        
    } catch (e) {
        throw Error('error occured while posting new data');
    }
};