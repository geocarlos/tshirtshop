const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'shipping_region',
    {
        shipping_region_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        shipping_region: { 
            type: Sequelize.STRING(100)
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)