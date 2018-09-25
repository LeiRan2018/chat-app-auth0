var chatService = require("../services/chat.service");

exports.getchat = async function(req, res) {
  try {
    var id = req.params.id;
    var query = await chatService.getchat(id);
    return res
      .status(200)
      .json({ status: 200, data: query, message: "successfully" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.postchat = async function(req, res) {
  try {
    var id = req.params.id;
    var data = req.body.data;
    var query = await chatService.postchat(id, data);
    return res
      .status(200)
      .json({ status: 200, data: query, message: "successfully" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
