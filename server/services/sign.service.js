var shortid = require('shortid');

const user = require('../models/user');

const user_chatRoom = require('../models/user-chat')

const chatRoom = require('../models/chatroom');

exports.postsign = async function (data) {
    try {
        //create a new user in user table using data from client
        return user.create({
            userID: shortid.generate(),
            userName: data.username,
            email: data.address,
        })

    } catch (e) {
        throw Error('error occured while posting new data');
    }
};

exports.postmess = async function (userID, roomID) {
    try {
        user_chatRoom.sync()
            .then(() => {
                user_chatRoom.create({
                    user_chatRoomID: shortid.generate(),
                    userID: userID,
                    chatRoomID: roomID
                })
            })

    } catch (e) {
        throw Error('error occured while putting user into user_chatroom');
    }
}

exports.getroom = async function () {
    try {
        return chatRoom.findOne();
    } catch (e) {
        throw Error('error occured while getting chatroom');
    }
}

