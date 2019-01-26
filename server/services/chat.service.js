var fs = require('fs');
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
            chatRoomID: data.chatRoomID,
            message: data.meg
        }))
        
    } catch (e) {
        throw Error('error occured while posting new data');
    }
};

exports.postuser = async function (data) {
    try {

        var chat = fs.readFileSync('data/user.txt').toString();
        var old_data = JSON.parse(chat);
        var found = old_data.find(el => {
            return el.username == data.username;
        })
        if (found != undefined) {
            
            var userid = found.userid;
            var content = fs.readFileSync('data/content.txt').toString();
            var info = JSON.parse(content);
            var founduserid = info.find(el => {
                return el.userid == userid;
            })
            founduserid['username'] = found['username'];
            founduserid['userlist'] = old_data;
            return founduserid;
        } else {
            return ' not existed';
        }
    } catch (e) {
        throw Error('error occured while posting new data');
    }
};
exports.postnewchat = async function (data) {
    try {
        var content = fs.readFileSync('data/content.txt').toString();
        var info = JSON.parse(content);
        var found = info.find(el => {
            return el.userid == data.userid;
        })
        console.log(data);
        if (found != undefined) {
            var index = info.findIndex(el => {
                return el.userid == found.userid;
            })
            found["content"].push(data.msg);
            info[index] = found;
            fs.truncateSync('data/content.txt');
            fs.writeFileSync('data/content.txt', JSON.stringify(info));

        }
    } catch (e) {
        throw Error('error occured while posting new data');
    }
}