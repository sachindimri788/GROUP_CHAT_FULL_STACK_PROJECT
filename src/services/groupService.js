const UserRepo = require('../repository/userRepo');
const userRepo = new UserRepo();
class GroupServices {
    async userChats(userId, message, name, groupId,uploadfile) {
        return userRepo.saveMessage(userId, message, name, groupId,uploadfile);
    }
    
    async archivedChat(groupId) {
        return userRepo.archivedChat(groupId);
    }
    // async getChats(id, groupId) {
    //     return await userRepo.getAllChats(id, groupId);
    // }
    async createGroup(groupName, userId) {
        const group = await userRepo.createGroup(groupName);
        return await userRepo.createUserGroup(userId, group.dataValues.id);
    }

    async showGroup(userId) {
        const data = await userRepo.showGroup(userId);
        const info = data.map((item) => ({
            groupName: item.dataValues.group.dataValues.groupName,
            groupId: item.dataValues.groupId
        }));
        return info;
    }

    async deleteGroup(id, userId) {
        let result = {}
        const isAdmin = await userRepo.isAdmin(userId, id);
        if (isAdmin) {
            await userRepo.deleteUserGroup(id);
            await userRepo.deleteGroup(id);
            result.message = "success";
        } else {
            result.message = "you are not the Admin";
        }
        return result;
    }

    async addMember(id, userId, email) {
        let result = {}
        const isAdmin = await userRepo.isAdmin(userId, id);
        if (isAdmin) {
            const memberId = await userRepo.getmemberIdFromEmail(email);
            if (memberId) {
                const exist = await userRepo.isMemberAlreadyExist(memberId.dataValues.id, id);
                if (!exist) {
                    await userRepo.addMemberUserGroup(memberId.dataValues.id, id);
                    result.message = "success";
                }
                else {
                    result.message = "already Exists";
                }
            }
            else {
                result.message = "Wrong Email Id"
            }
        } else {
            result.message = "you are not the Admin";
        }
        return result;
    }
    async deleteMember(id, userId, email) {
        let result = {}
        const isAdmin = await userRepo.isAdmin(userId, id);
        if (isAdmin) {
            const memberId = await userRepo.getmemberIdFromEmail(email);
            if (memberId) {
                await userRepo.deleteMemberUserGroup(memberId.dataValues.id, id);
                result.message = "successfully deleted";
            }
            else {
                result.message = "Wrong Email Id"
            }
        } else {
            result.message = "you are not the Admin";
        }
        return result;
    }

    async addAdmin(id, userId, email) {
        let result = {}
        const isAdmin = await userRepo.isAdmin(userId, id);
        if (isAdmin) {
            const memberId = await userRepo.getmemberIdFromEmail(email);
            if (memberId) {
                const exist = await userRepo.isMemberAlreadyExist(memberId.dataValues.id, id);
                if (exist) {
                    await userRepo.addAdmin(memberId.dataValues.id, id);
                    result.message = "success";
                }
                else {
                    result.message = "Member Not In This Group";
                }
            }
            else {
                result.message = "Wrong Email Id"
            }
        } else {
            result.message = "you are not the Admin";
        }
        return result;
    }

    async showUserInGroup(groupId) {
        const data = await userRepo.showUserInGroup(groupId);
        return data.map((item) => item.dataValues.user.dataValues);

    }
}


module.exports = GroupServices;