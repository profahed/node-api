const Sequelize = require('sequelize');

const db = require('../helpers/database');

const Task = db.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title: Sequelize.STRING,
    content: Sequelize.TEXT
});

module.exports = Task;