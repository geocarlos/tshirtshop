const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'shipping',
    {
        shipping_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        shipping_type: { 
            type: Sequelize.STRING(100)
        },
        shipping_cost: { 
            type: Sequelize.DECIMAL(10, 2)
        },
        shipping_region: { 
            type: Sequelize.INTEGER(11)
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)