const UserServices = require('../services/userService');
const Razorpay = require('razorpay');
const userServices = new UserServices();
require('dotenv').config({ path: './env/development.env' })

const userRegister = async (req, res) => {
    try {
        const { name, email, password,phone } = req.body;
        const user = { name, email, password,phone }
        const result = await userServices.userRegister(user);
        return res.status(result.statusCode).json({ message: result.message });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "failed" })
    }

};


module.exports = { userRegister };