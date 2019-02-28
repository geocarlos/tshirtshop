const express = require('express');
const router = new express.Router({});
const cart = require('./shopping-cart');

/* URLS */
const rootUrl = '/api'
const urls = {
    setCartId: rootUrl + '/shopping-cart/set-cart-id',
    getShoppingCart: rootUrl + '/shopping-cart/:id([A-Z0-9]+)'
}

/**
 * Set user's cartId
 */
router.use(urls.setCartId, async (req, res) => {
    let shoppingCart = null;
    try {
        if (!req.cookies.cart_id) {
            shoppingCart = await cart.setUserCartId(req, res)
        } else {
            shoppingCart = await cart.getCartByCartId(req.cookies.cart_id);
        }        
        return res.json(shoppingCart);
    } catch (error) {
        res.json(error);
    }
});

router.get(urls.getShoppingCart, (req, res) => {
    res.json({message: req.params.id})
})

module.exports = router;