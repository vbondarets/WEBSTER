const sequelize = require('./db');
const { DataTypes } = require('sequelize');


const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    full_name: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, defaultValue: `${process.env.DOMAIN}/api/images/default_user.png` },
    role: { type: DataTypes.ENUM('USER', 'ADMIN'), defaultValue: "USER" },
});

const Photos = sequelize.define('photos', {
    photo: { type: DataTypes.STRING, allowNull: false },
    AI: { type: DataTypes.BOOLEAN, defaultValue: false },
});

User.hasMany(Photos);
Photos.belongsTo(User);

module.exports = {
    User,
    Photos,
};
