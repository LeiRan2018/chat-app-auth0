var fs = require('fs');
var shortid = require('shortid');

exports.postchat = async function (data) {
    try {
        //save this user to the content.txt file 
        var userid = shortid.generate();
        var user = { "userid": userid, "content": [] };
        var chat1 = fs.readFileSync('data/content.txt').toString();
        var old_user = JSON.parse(chat1);
        var found1 = old_user.find(el => {
            return el.userid == user.userid;
        })
        if (found1 == undefined) {
            old_user.push(user);
            fs.truncateSync('data/content.txt');
            fs.writeFileSync('data/content.txt', JSON.stringify(old_user));
        }

        data['userid'] = userid;
        var chat = fs.readFileSync('data/user.txt').toString();
        var old_data = JSON.parse(chat);
        var found = old_data.find(el => {
            return el.username == data.username;
        })
        //save the new user to the user.txt file if not found
        if (found == undefined) {
            old_data.push(data);
            fs.truncateSync('data/user.txt');
            fs.writeFileSync('data/user.txt', JSON.stringify(old_data));
            return 'Sign up done';
        } else {
            return 'Account already existed';
        }
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