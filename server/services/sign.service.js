var shortid = require('shortid');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('chat-app', 'root', 'example', {
    dialect: 'mysql',
    host: "127.0.0.1",
    port: 3306,
});

var User = sequelize.define('user', {
    userID: Sequelize.STRING,
    userName: Sequelize.STRING,
    email: Sequelize.STRING,
});

exports.postsign = async function (data) {
    try {
        sequelize.sync()
            .then(() => User.create({
                userID: shortid.generate(),
                userName: data.username,
                email: data.address,
            }))
            .then(user => {
                console.log(user.toJSON());
            });

    } catch (e) {
        throw Error('error occured while posting new data');
    }
};

