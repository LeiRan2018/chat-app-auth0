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

exports.postchat = async function (data) {
    try {
        sequelize.sync()
        .then(() => message.create({
            messageID: shortid.generate(),
            chatRoomID: data.chatid,
            message: data.msg
        }))
        
    } catch (e) {
        throw Error('error occured while posting new data');
    }
};