var roomService = require("../services/room.service");


exports.postroom = async function (req, res) {
  try {
    var chatroom;
    var data = req.body.data;
    if (data.includes(',')) {
      //split the usercombination and then assgining to user1 and user2
    user1 = data.split(',')[0];
    user2 = data.split(',')[1];
    //check if there is room exsited using these two users
    tempcomb1 = await roomService.exit(user1 + user2);
    tempcomb2 = await roomService.exit(user2 + user1);
    //get this room ID if existed else creating a new
    chatroom = tempcomb1 ? tempcomb1 : tempcomb2 ? tempcomb2 : await roomService.createroom(user1+user2);
    }
    else {
      chatroom = await roomService.exit(data);
    }
    
    //get history message for this room in message table
    var message = await roomService.gethistory(chatroom.chatRoomID);
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