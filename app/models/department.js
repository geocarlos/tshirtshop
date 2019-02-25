const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'department',
    {
        department_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: { 
            type: Sequelize.STRING(100)
        },
        description: {
            type: Sequelize.STRING(1000)
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)