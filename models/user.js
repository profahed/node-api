const Sequelize = require('sequelize');

const db = require('../helpers/database');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name: Sequelize.STRING,
    email: {
       type: Sequelize.STRING
    },
    password: Sequelize.STRING
},{
    indexes: [{
        unique: true,
        fields: ['email']
    }]
});


module.exports = User;