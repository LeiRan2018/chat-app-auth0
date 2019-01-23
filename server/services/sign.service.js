var fs = require('fs');
var shortid = require('shortid');

exports.postsign = async function (data) {
    try {
        //save this user to the content.txt file 
        var userid = shortid.generate();
        var user = { "userid": userid, "content": [] };
        var sign1 = fs.readFileSync('data/content.txt').toString();
        var old_user = JSON.parse(sign1);
        var found1 = old_user.find(el => {
            return el.userid == user.userid;
        })
        if (found1 == undefined) {
            old_user.push(user);
            fs.truncateSync('data/content.txt');
            fs.writeFileSync('data/content.txt', JSON.stringify(old_user));
        }

        data['userid'] = userid;
        var sign = fs.readFileSync('data/user.txt').toString();
        var old_data = JSON.parse(sign);
        var found = old_data.find(el => {
            return el.username == data.username;
        })
        //save the new user to the user.txt file if not found
        if (found == undefined) {
            old_data.push(data);
            fs.truncateSync('data/user.txt');
            fs.writeFileSync('data/user.txt', JSON.stringify(old_data));
            return 'Sign up done';
        } else {
            return 'Account already existed';
        }
    } catch (e) {
        throw Error('error occured while posting new data');
    }
};