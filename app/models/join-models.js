const Sequelize = require('sequelize');
const db = require('../database/db');

const ProductCategory = db.sequelize.define(
    'product_category',
    {
        product_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
        },
        category_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
        }
        
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

const ProductAttribute = db.sequelize.define(
    'product_attribute',
    {
        product_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
        },
        attribute_value_id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
        }
        
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = {
    ProductCategory,
    ProductAttribute
}