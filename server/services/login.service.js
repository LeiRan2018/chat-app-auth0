var fs = require('fs');
var user = requtre('./models/user.model');
const Sequelize = require('sequelize');

exports.postlogin = async function (data) {
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

const User = user;
const sequelize = new Sequelize('chat-app', 'root', 'example', {
    dialect: 'mysql',
    host: "127.0.0.1",
    port: 3306,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    
    User.findAll().then(users => {
        console.log(users)
    });