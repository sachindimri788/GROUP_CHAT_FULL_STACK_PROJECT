const { Op } = require('sequelize');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Group = require('../models/groupModel');
const UserGroup = require('../models/usergroupsModel');
const ArchivedChat = require('../models/archivedchatModel');
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

    async saveMessage(userId, message, name,groupId,uploadfile) {
        return await Chat.create({ message, userId, name,groupId ,fileUrl:uploadfile})
    }

    // async getAllChats(id,groupId) {
    //     return await Chat.findAll({
    //         where: {
    //           id: { [Op.gt]: id },
    //           groupId: groupId, 
    //         },
    //         attributes: ["message", "name", "id", "userId", "groupId"],
    //         order: [['createdAt', 'ASC']],
    //       });    
    // }
    async archivedChat(groupId) {
        return ArchivedChat.findAll({where:{groupId}});
    }
    

    async createGroup(groupName) {
        return await Group.create({ groupName });
    }

    async createUserGroup(userId, groupId) {
        return await UserGroup.create({ userId, groupId, isAdmin: true });
    }

    async showGroup(userId) {
        return await UserGroup.findAll({
            where: { userId },
            attributes: ["groupId"],
            include: [{ model: Group, attributes: ["groupName"] }]
        });
    }

    async isAdmin(userId, groupId) {
        const isAdmin = await UserGroup.findOne({ where: { groupId, userId } });
        return isAdmin.dataValues.isAdmin;
    }
    async deleteUserGroup(groupId) {
        return await UserGroup.destroy({ where: { groupId } })
    }
    async deleteGroup(id) {
        return await Group.destroy({ where: { id } })
    }
    async getmemberIdFromEmail(email) {
        return await User.findOne({ where: { email }, attributes: ["id"] })
    }
    async isMemberAlreadyExist(userId, groupId) {
        return await UserGroup.findOne({ where:{userId, groupId} });
    }
    async addMemberUserGroup(userId, groupId) {
        return await UserGroup.create({ userId, groupId });
    }
    async deleteMemberUserGroup(userId, groupId) {
        return await UserGroup.destroy({ where: { userId, groupId } });
    }
    async addAdmin(userId, groupId) {
        return await UserGroup.update(
            { isAdmin: true },
            { where: { userId, groupId } }
        );
    }
    async showUserInGroup(groupId){
        return await UserGroup.findAll({where:{groupId},include:[{model:User,attributes:["name"]}]})
        
    }
}

module.exports = UserRepo;