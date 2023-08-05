const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
sequelize.options.logging = false;

const UserGroup = sequelize.define("usergroups", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
    }
});


module.exports = UserGroup;