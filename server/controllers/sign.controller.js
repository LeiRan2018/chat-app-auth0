var signService = require('../services/sign.service');

exports.postsign = async function (req, res) {
    try {
        var data = req.body.data;
        var query = await signService.postsign(data);
        //get broadroom in chatroom table
        var chatroom = await signService.getroom();
        //create a row binding user-broadcastroom in user-chatroom table
        await signService.postmess(query.userID, chatroom.chatRoomID);
        return res
            .status(200)
            .json({ status: 200, data: query, message: "successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}