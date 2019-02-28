const ShoppingCart = require('../../models/shopping-cart');
const Product = require('../../models/product');
const { COOKIE_LIFE } = require('../constants');
const md5 = require('md5');

/* Model associations */
ShoppingCart.belongsTo(Product, {foreignKey: 'product_id'});

/**
 *Create cart for user if one does not exist
 *@param req
 *@param res
 */
const setUserCartId = async (res) => {

    const randomNumber = Math.random().toString();
    const cart_id = md5(randomNumber);
    res.cookie('cart_id', cart_id, { maxAge: COOKIE_LIFE, httpOnly: true });
    return cart_id;
}

/**
 * GET shopping cart by cart_id from cookie
 * @param {String} cart_id 
 */
const getCartRecords = async (cart_id) => {
    try{
        return await ShoppingCart.findAll({
            include: [
                {
                    model: Product,
                    attributes: ['product_id', 'name', 'thumbnail']
                }
            ],
            where: {
                cart_id
            }
        });
    } catch (error) {
        throw error;
    }
}

/**
 * Add an item to shopping cart
 * @param {String} cart_id 
 * @param {Object} data The request body 
 */
const addProductToCart = async (cart_id, data) => {
    try {
        return await ShoppingCart.create({
            cart_id, 
            product_id: data.product_id,
            _attributes: data._attributes,
            quantity: data.quantity,
            buy_now: data.buy_now || 1
        });
    } catch (error) {
        throw error;
    }
} 

/**
 * Remove an item from shopping cart
 * @param {Number} item_id 
 */
const removeProductFromCart = async item_id => {
    try {
        return await ShoppingCart.destroy({
            where: {
                item_id
            }
        })
    } catch (error) {
        throw error;
    }
} 

/**
 * Update a shopping card record
 * @param {Object} data
 */
const updateCartRecord = async (data) => {
    try {
        return await ShoppingCart.update({
            _attributes: data._attributes,
            quantity: data.quantity,
            buy_now: data.buy_now || 1
        }, 
        {
            where: {
                item_id: data.item_id
            }
        });
    } catch (error) {
        throw error;
    }
}
 
module.exports = {
    setUserCartId,
    addProductToCart,
    getCartRecords,
    removeProductFromCart,
    updateCartRecord
}
