const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
sequelize.options.logging = false;

const ArchivedChat = sequelize.define("archivedchats", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.STRING,
  },
  fileUrl:{
    type: DataTypes.STRING,
  },
  userId:{
    type:DataTypes.STRING,
  }
});

module.exports = ArchivedChat;