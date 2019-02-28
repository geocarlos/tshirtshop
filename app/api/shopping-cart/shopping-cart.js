const ShoppingCart = require('../../models/shopping-cart');
const Product = require('../../models/product');
const createCart = require('./create-shopping-cart');
const { COOKIE_LIFE } = require('../constants');

/* Model associations */
ShoppingCart.belongsTo(Product, {foreignKey: 'product_id'});

/**
 *Create cart for user if one does not exist
 *@param req
 *@param res
 */
const setUserCartId = async (req, res) => {

    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring( 2, randomNumber.length);
    res.cookie('cart_id', randomNumber, { maxAge: COOKIE_LIFE, httpOnly: true });

    try{
        return await createCart(randomNumber, req.body);
    } catch(error){
        throw error;
    }
}

/**
 * GET shopping cart by cart_id from cookie
 * @param {String} cart_id 
 */
const getCartByCartId = async (cart_id) => {
    try{
        return await ShoppingCart.findOne({
            include: [
                {
                    model: Product,
                    attributes: ['product_id', 'name']
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

const addProductToCart = async product_id => {

} 

const removeProductFromCart = async product_id => {

} 

const getProductsFromCart = async cart_id => {

}
 
module.exports = {
    setUserCartId,
    getCartByCartId
}
