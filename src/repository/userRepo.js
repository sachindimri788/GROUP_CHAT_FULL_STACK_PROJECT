const Chat = require('../models/chatModel');
const User = require('../models/userModel');

class UserRepo {
    async userRegister(user, hash) {
        return await User.create({ ...user, password: hash });
    }

    async isMailExists(email) {
        const exist = await User.findOne({ where: { email } });
        return exist ? true : false;
    }

    async userDetails(email) {
        return await User.findOne({ where: { email } });
    }

    async saveMessage(userId,message,name){
        return await Chat.create({message,userId,name})
    }
}

module.exports = UserRepo;