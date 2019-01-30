var loginService = require('../services/login.service');

exports.postlogin = async function (req, res) {
    try {
        var data = req.body.data;
        var user = await loginService.postlogin(data);
        var chatroom = await loginService.postlogin2();
        var logtime = await loginService.postlogin3(user.userID);
        var message = await loginService.postlogin4(chatroom.chatRoomID);
        var sortedmes = [];
        logtime.forEach(time => {
            console.log(time.createdAt + ',' + time.updatedAt)
        });
        message.forEach(element =>{
            console.log(element.message + '' + element.createdAt)
        });
        message.forEach(element => {
            logtime.forEach(time => {
                if (+time.createdAt <= +element.createdAt && +time.updatedAt >= +element.createdAt) {
                    console.log(element.message + '' + element.createdAt);
                    sortedmes.push(element.message + '' + element.createdAt);
                };
            })
        })
        console.log(sortedmes);
        return res
            .status(200)
            .json({
                status: 200, data: {
                    username: user.userName,
                    userid: user.userID,
                    chatid: chatroom.chatRoomID,
                    message: sortedmes
                }, message: "successfully"
            });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.postlogout = async function (req, res) {
    try {
        var data = req.body.data;
        console.log(data);
        var query = await loginService.postlogout(data);
        return res
            .status(200)
            .json({ status: 200, message: 'successfully' });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}