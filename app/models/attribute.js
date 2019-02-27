const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'attribute',
    {
        attribute_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: { 
            type: Sequelize.STRING(100)
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)