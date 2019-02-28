const express = require('express');
const router = new express.Router({});
const order = require('./order');

/* URLS */
const rootUrl = '/api'
const urls = {
    setCartId: rootUrl + '/order/set-cart-id'
}

/**
 * Set user's cartId
 */
router.use(urls.setCartId, async (req, res) => {
    let cart = null;
    try {
        if (!req.cookies.cart_id) {
            cart = await order.setUserCartId(req, res)
        } else {
            cart = await order.getCartByCartId(req.cookies.cart_id);
        }        
        return res.json(cart);
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;