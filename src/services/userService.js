const UserRepo = require('../repository/userRepo');
const userRepo = new UserRepo();
const bcrypt = require('bcrypt');
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

}


module.exports = UserServices;