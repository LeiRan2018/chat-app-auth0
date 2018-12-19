// import {User} from '../models/user.model';
// import {Chat} from '../models/chat.model';
var User = require('../models/user.model');
var Chat = require('../models/chat.model');
var fs = require('fs');
var shortid = require('shortid');
exports.getchat = async function (id) {
    try {

        var chat = fs.readFileSync('./data.txt').toString();
        var data = JSON.parse(chat);
        var query;
        data.forEach(element => {
            if (element.userid == id) {
                query = element
            }
        });
        if (query != undefined) {
            return query;
        } else {
            return false;
        }
    } catch (e) {
        throw Error('error occured while finding userid');
    }
};
exports.postchat = async function (data) {
    try {
        //save this user to the content.txt file 
        var userid = shortid.generate();
        var user = { "userid": userid, "content": [] };
        var chat1 = fs.readFileSync('content1.txt').toString();
        var old_user = JSON.parse(chat1);
        var found1 = old_user.find(el => {
            return el.userid == user.userid;
        })
        if (found1 == undefined) {
            old_user.push(user);
            fs.truncateSync('content1.txt');
            fs.writeFileSync('content1.txt', JSON.stringify(old_user));
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
            var content = fs.readFileSync('content1.txt').toString();
            var info = JSON.parse(content);
            var founduserid = info.find(el => {
                return el.userid == userid;
            })
            founduserid['username'] = found['username'];
            founduserid['userlist'] = old_data;
            // console.log(founduserid);
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
        var content = fs.readFileSync('content1.txt').toString();
        var info = JSON.parse(content);
        var found = info.find(el => {
            return el.userid == data.userid;
        })
        console.log(data);
        if (found != undefined) {
            var index = info.findIndex(el => {
                return el.userid == found.userid;
            })
            found["content"].push(...data.msg);
            info[index] = found;
            fs.truncateSync('content1.txt');
            fs.writeFileSync('content1.txt', JSON.stringify(info));

        }


    } catch (e) {
        throw Error('error occured while posting new data');
    }
}