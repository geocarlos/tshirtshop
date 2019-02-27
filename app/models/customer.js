const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'customer',
    {
        customer_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: { 
            type: Sequelize.STRING(50)
        },
        email: {
            type: Sequelize.STRING(100),
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING(72)
        },
        credit_card: {
            type: Sequelize.TEXT
        },
        address_1: {
            type: Sequelize.STRING(100)
        },
        address_2: {
            type: Sequelize.STRING(100)
        },
        city: {
            type: Sequelize.STRING(100)
        },
        region: {
            type: Sequelize.STRING(100)
        },
        postal_code: {
            type: Sequelize.STRING(100)
        },
        country: {
            type: Sequelize.STRING(100)
        },
        day_phone: {
            type: Sequelize.STRING(100)
        },
        eve_phone: {
            type: Sequelize.STRING(100)
        },
        mob_phone: {
            type: Sequelize.STRING(100)
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)