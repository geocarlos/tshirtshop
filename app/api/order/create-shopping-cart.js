const ShoppingCart = require('../../models/shopping-cart');

module.exports = async (cart_id, body) => {
    
    try {
        return await ShoppingCart.create({
            cart_id, 
            product_id: body.product_id,
            _attributes: body._attributes,
            quantity: body.quantity,
            buy_now: body.buy_now || 1
        });
    } catch (error) {
        throw error;
    }
    
}


