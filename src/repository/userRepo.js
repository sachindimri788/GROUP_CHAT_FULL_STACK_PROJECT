const User = require('../models/userModel');

class UserRepo {
    async userRegister(user,hash) {
        return await User.create({ ...user, password: hash });
    }

    async isMailExists(email) {
        const exist = await User.findOne({ where: { email } });
        return exist ? true : false;
    }

}

module.exports = UserRepo;