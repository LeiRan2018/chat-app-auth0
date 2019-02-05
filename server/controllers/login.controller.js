var loginService = require('../services/login.service');

exports.postlogin = async function (req, res) {
    try {
        var data = req.body.data;
        var user = await loginService.postlogin(data);
        var chatroom = await loginService.postlogin2();
        var message = await loginService.postlogin4(chatroom.chatRoomID);
        var contacts = await loginService.postlogin5();
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
                    contacts: contacts
                }, message: "successfully"
            });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.postlogout = async function (req, res) {
    try {
        var data = req.body.data;
        var query = await loginService.postlogout(data);
        return res
            .status(200)
            .json({ status: 200, message: 'successfully' });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}