// import {User} from '../models/user.model';
// import {Chat} from '../models/chat.model';
var User = require('../models/user.model');
var Chat = require('../models/chat.model');
var fs = require('fs');
exports.getchat = async function (id) {
    try {

        var chat = fs.readFileSync('./data.txt').toString();
        var data = JSON.parse(chat);
        var query;
        data.forEach(element => {
            if(element.userid == id){
                query = element
            }
        });
        if(query != undefined) {
            return query;
        }else {
            return false;
        }
    }catch(e) {
        throw Error('error occured while finding userid');
    }
}