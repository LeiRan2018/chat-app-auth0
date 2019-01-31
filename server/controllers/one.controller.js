var oneService = require("../services/one.service");


exports.postone = async function (req, res) {
  try {
    var data = req.body.data;
    user1 = data.split(',')[0];
    user2 = data.split(',')[1];
    tempcomb1 = await oneService.exit(user1 + user2);
    tempcomb2 = await oneService.exit(user2 + user1);
    let chatroom;
    chatroom = tempcomb1 ? tempcomb1 : tempcomb2 ? tempcomb2 : await oneService.postone(user1+user2);
    var message = await oneService.postone2(chatroom.chatRoomID);
    return res
      .status(200)
      .json({
        status: 200, data: {
          roomID: chatroom.chatRoomID,
          message: message
        }, message: "successfully"
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};