const chatRoom = require('../models/chatroom');

const message = require('../models/message');

exports.createroom = async function (data) {
    try {
        return chatRoom.create({
            chatRoomID: data
        });

    } catch (e) {
        throw Error('error occured while posting new data');
    }
};

exports.gethistory = async function (data) {
    try {
        return message.findAll({ where: { chatRoomID: data } })
    }
    catch (e) {
        throw Error('error occured while catching userchat table');
    }
};

exports.exit = async function (chatRoomID) {
    try {
        return chatRoom.findOne({ where: { chatRoomID: chatRoomID } });
    }
    catch (e) {
        throw Error('error occured while catching userchat table');
    }
};