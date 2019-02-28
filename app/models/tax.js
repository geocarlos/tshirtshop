const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'tax',
    {
        tax_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        tax_type: { 
            type: Sequelize.STRING(100)
        },
        tax_percentage: { 
            type: Sequelize.DECIMAL(10,2)
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)