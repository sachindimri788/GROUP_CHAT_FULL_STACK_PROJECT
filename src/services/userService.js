const UserRepo = require('../repository/userRepo');
const userRepo = new UserRepo();
const bcrypt = require('bcrypt');
const { generateToken } = require('../util/auth');
class UserServices {
    async userRegister(user) {
        let result = {};
        const exist = await userRepo.isMailExists(user.email);
        if (!exist) {
            const hash = await bcrypt.hash(user.password, 10);
            if (hash) {
                await userRepo.userRegister(user, hash);
                result.statusCode = 200;
                result.message = "Register Successful";
            } else {
                result.statusCode = 500;
                result.message = "Internal Error";
            }
        }
        else {
            result.statusCode = 409;
            result.message = "Email Already Exists";
        }
        return result;
    }
    async userLogin(email, password) {
        let result = {};
        const exist = await userRepo.isMailExists(email);
        if (exist) {
            const userInfo = await userRepo.userDetails(email);
            const bpass = await bcrypt.compare(password, userInfo.password);
            if (bpass) {
                const token = generateToken({ userId: userInfo.dataValues.id, userName: userInfo.dataValues.name });
                result.statusCode = 200;
                result.message = "Login SuccessFully";
                result.token = token;
            } else {
                result.statusCode = 401;
                result.message = "Invalid Password";
            }
        }
        else {
            result.statusCode = 401;
            result.message = "User Not found";
        }
        return result;
    }
}


module.exports = UserServices;