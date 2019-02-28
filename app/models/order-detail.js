const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'order_detail',
    {
        item_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        product_id: { 
            type: Sequelize.DECIMAL(10,2)
        },
        _attributes: {
            type: Sequelize.STRING(1000)
        },
        product_name: {
            type: Sequelize.STRING(100)
        },
        quantity: {
            type: Sequelize.INTEGER(11)
        },
        unit_cost: {
            type: Sequelize.DECIMAL(10,2)
        }       
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)