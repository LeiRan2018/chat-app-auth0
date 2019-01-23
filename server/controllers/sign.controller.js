var signService = require('../services/sign.service');

exports.postsign = async function (req, res) {
    try {
        var data = req.body.data;
        var query = await signService.postsign(data);
        return res
            .status(200)
            .json({ status: 200, data: query, message: "successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}