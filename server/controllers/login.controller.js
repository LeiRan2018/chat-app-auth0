var loginService = require('../services/login.service');

exports.postlogin = async function (req, res) {
    try {
        var data = req.body.data;
        //get user information from user table
        var user = await loginService.getuser(data);
        //get broadroom ID from user-chat table
        var chatroom = await loginService.getchatroom();
        //get the broadroom chat history from message table
        var message = await loginService.gethistory(chatroom.chatRoomID);
        //get contacts from user table
        var contact = await loginService.getcontact();
        //filter message that only shown after user signing up
        var sortedmes = message.filter(element => {
            if (+user.createdAt <= +element.createdAt) {
                return element;
            }
        });
        return res
            .status(200)
            .json({
                status: 200, data: {
                    username: user.userName,
                    userid: user.userID,
                    chatid: chatroom.chatRoomID,
                    message: sortedmes,
                    contacts: contact
                }, message: "successfully"
            });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.postlogout = async function (req, res) {
    try {
        var data = req.body.data;
        //records the log out time for this user in user-chat table
        await loginService.postlogout(data);
        return res
            .status(200)
            .json({ status: 200, message: 'successfully' });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}