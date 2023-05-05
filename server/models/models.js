const sequelize = require('./db');
const { DataTypes } = require('sequelize');


const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('USER', 'ADMIN'), defaultValue: "USER" },
});

module.exports = {
    User
};
