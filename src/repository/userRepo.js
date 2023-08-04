const { Op } = require('sequelize');
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

    async getAllChats(id){
        return await Chat.findAll({where: { id: { [Op.gt]: id } },attributes:["message","name","id","userId"],order: [['createdAt', 'ASC']]});
    }
}

module.exports = UserRepo;