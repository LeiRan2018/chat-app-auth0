var chatService = require("../services/chat.service");


exports.postchat = async function (req, res) {
  try {
    var data = req.body.data;
    var query = await chatService.postchat(data);
    return res
      .status(200)
      .json({ status: 200, data: query, message: "successfully" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.postuser = async function (req, res) {
  try {
    var data = req.body.data;
    var query = await chatService.postuser(data);
    return res
      .status(200)
      .json({ status: 200, data: query, message: "successfully" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.postnewchat = async function (req, res) {
  try {
    var data = req.body.data;
    var query = await chatService.postnewchat(data);
    return res
      .status(200)
      .json({ status: 200, data: query, message: "successfully" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
