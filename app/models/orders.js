const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'orders',
    {
        order_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        total_amount: { 
            type: Sequelize.DECIMAL(10,2),
        },
        created_on: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        shipped_on: {
            type: Sequelize.DATE,
        },
        status: {
            type: Sequelize.INTEGER(11),
            defaultValue: 0,
            allowNull: false
        },
        comments: {
            type: Sequelize.STRING(255),
        },
        customer_id: {
            type: Sequelize.INTEGER(11),
        },
        auth_code: {
            type: Sequelize.STRING(50),
        },
        reference: {
            type: Sequelize.STRING(50),
        },
        shipping_id: {
            type: Sequelize.INTEGER(11),
        },
        tax_id: {
            type: Sequelize.INTEGER(11),
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)