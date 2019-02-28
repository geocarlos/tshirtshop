const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'shopping_cart',
    {
        item_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        cart_id: { 
            type: Sequelize.STRING(32)
        },
        product_id: {
            type: Sequelize.INTEGER(11)
        },
        _attributes: {
            type: Sequelize.STRING(1000)
        },
        quantity: {
            type: Sequelize.INTEGER(11)
        },
        buy_now: {
            type: Sequelize.TINYINT(1)
        },
        added_on: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)