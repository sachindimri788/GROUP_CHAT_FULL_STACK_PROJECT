const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
const User = require('./userModel');
sequelize.options.logging = false;

const Chat = sequelize.define("chats", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    message: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
        },
    }
});

User.hasMany(Chat, { onDelete: "CASCADE", hooks: true });
Chat.belongsTo(User);

module.exports = Chat;