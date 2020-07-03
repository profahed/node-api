const Sequelize = require('sequelize');

const db = new Sequelize('node_test','root','root', {
    dialect: 'mysql',
    host: 'mysql'
});

module.exports = db;