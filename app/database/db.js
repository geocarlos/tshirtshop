const conf = require('../../config/config.json');
const Sequelize = require('sequelize');
const db = {};

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(conf[env].database, conf[env].username, conf[env].password, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000    
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;