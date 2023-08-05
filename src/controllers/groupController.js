const GroupServices = require('../services/groupService');
const groupServices = new GroupServices();
require('dotenv').config({ path: './env/development.env' })


exports.userChats = async (req, res) => {
    try {
        const userId = res.locals.userId;
        const name=res.locals.user.name;
        const { message,groupId } = req.body;
        await groupServices.userChats(userId, message,name,groupId);
        return res.status(200).json({ message: "success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "failed" });
    }
}


exports.getChats=async(req,res)=>{
    try {
        const {id,groupId}=req.query;
        const result=await groupServices.getChats(id,groupId);
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "failed" });
    }
}

exports.createGroup=async(req,res)=>{
    try {
        const {groupName}=req.body;
        const userId=res.locals.userId;
        await groupServices.createGroup(groupName,userId);
        return res.status(200).json({message:"success"})
    } catch (error) {
        return res.status(500).json({ message: "failed" });
    }
}

exports.showGroup=async(req,res)=>{
    try {
        const userId=res.locals.userId;
        const data=await groupServices.showGroup(userId);
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: "failed" });
    }
}

exports.deleteGroup=async(req,res)=>{
    try{
        const {id}=req.query;
        const userId=res.locals.userId;
        const data=await groupServices.deleteGroup(id,userId);
        return res.status(200).json(data)
    } catch(error){
        console.log(error)
        return res.status(500).json({ message: "failed" });
    }
}

exports.addMember=async(req,res)=>{
    try {
        const {id,email}=req.body;
        const userId=res.locals.userId;
        const data=await groupServices.addMember(id,userId,email);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

exports.deleteMember=async(req,res)=>{
    try {
        const {id,email}=req.body;
        const userId=res.locals.userId;
        const data=await groupServices.deleteMember(id,userId,email);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

exports.makeAdmin=async(req,res)=>{
    try {
        const {id,email}=req.body;
        const userId=res.locals.userId;
        const data=await groupServices.addAdmin(id,userId,email);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}


exports.showUserInGroup=async(req,res)=>{
    try{
        const {groupId}=req.query;
        const data=await groupServices.showUserInGroup(groupId);
        return res.status(200).json(data)
    } catch(error){
        console.log(error)
        return res.status(500).json({ message: "failed" });
    }
}