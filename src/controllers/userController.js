const UserServices = require('../services/userService');
const userServices = new UserServices();
require('dotenv').config({ path: './env/development.env' })

exports.userRegister = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const user = { name, email, password, phone }
        const result = await userServices.userRegister(user);
        return res.status(result.statusCode).json({ message: result.message });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "failed" })
    }

};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userServices.userLogin(email, password);
        return res.status(result.statusCode).json({ message: result.message, token: result.token ? result.token : undefined })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "failed" });
    }
}

exports.userChats = async (req, res) => {
    try {
        const userId = res.locals.userId;
        const name=res.locals.user.name;
        const { message } = req.body;
        await userServices.userChats(userId, message,name);
        return res.status(200).json({ message: "success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "failed" });
    }
}


exports.getChats=async(req,res)=>{
    try {
        const result=await userServices.getChats();
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "failed" });
    }
}