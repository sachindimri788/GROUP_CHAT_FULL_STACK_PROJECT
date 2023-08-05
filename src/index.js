const express = require('express');
const router = require('./routes/indexRoutes');
require('dotenv').config({ path: '../env/development.env' })
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = require("../config/db");
const port = process.env.PORT || 3000;

//models
const User = require("./models/userModel");
const Chat = require("./models/chatModel");
const Group = require("./models/groupModel");
const UserGroup = require("./models/usergroupsModel");

//Relationships between Tables
User.hasMany(Chat, { onDelete: "CASCADE", hooks: true });

Chat.belongsTo(User);
Chat.belongsTo(Group);

User.hasMany(UserGroup);

Group.hasMany(Chat);
Group.hasMany(UserGroup);

UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);

app.use(cors({
  // origin:"http://127.0.0.1:5500",     it allows only this url
  // methods:['GET','POST','PUT'],       it allows these types of request
  // credentials: true,                   for cookies because bydefault cookies are blocked
}));
app.use('/', router);


sequelize
  .sync()
  .then((result) => {
    app.listen(port,()=>{console.log(`listening at port ${port}`)});
  })
  .catch((err) => console.log(err));