const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'product',
    {
        product_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: { 
            type: Sequelize.STRING(100)
        },
        description: {
            type: Sequelize.STRING(1000)
        },
        price: {
            type: Sequelize.DECIMAL(10,2)
        },
        discounted_price: {
            type: Sequelize.DECIMAL(10,2)
        },
        image: {
            type: Sequelize.STRING(150)
        },
        image_2: {
            type: Sequelize.STRING(150)
        },
        thumbnail: {
            type: Sequelize.STRING(150)
        },
        display: {
            type: Sequelize.SMALLINT(6)
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)