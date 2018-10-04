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
};
exports.postchat = async function (data) {
    try {

        var chat = fs.readFileSync('./data1.txt').toString();
        var old_data = JSON.parse(chat);
      
        old_data.push(data);
        // old_data.push(new_json);
        fs.truncateSync('./data1.txt');
        fs.writeFileSync('./data1.txt', JSON.stringify(old_data) );
        return 'successed';
        // var query;
        // var new_chat = fs.readFileSync('./data1.txt').toString();
        // var new_data = JSON.parse(new_chat);
        // // return new_data;
        // new_data.forEach(element => {
        //     if(element.userid == id){
        //         query = element
        //     }
        // });
        // if(query != undefined) {
        //     return query;
        // }else {
        //     return false;
        // }
    }catch(e) {
        throw Error('error occured while posting new data');
    }
};