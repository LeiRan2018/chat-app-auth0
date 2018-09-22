var User = require('../models/user.model');
module.exports = class Chat {
    constructor(from, content) {
        this.from = from;
        this.content = content;
    }
}