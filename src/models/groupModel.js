const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
sequelize.options.logging = false;

const Group = sequelize.define("groups", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    groupName: {
        type: DataTypes.STRING,
    },
    adminName: {
        type: DataTypes.STRING,
    },
});

module.exports = Group;