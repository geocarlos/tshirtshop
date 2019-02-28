const express = require('express');
const router = new express.Router({});
const cart = require('./shopping-cart');

/* URLS */
const rootUrl = '/api'
const urls = {
    addProductToCart: rootUrl + '/shopping-cart/add-to-cart',
    updateProductInCart: rootUrl + '/shopping-cart/update-cart',
    getShoppingCart: rootUrl + '/shopping-cart',
    removeProductFromCart: rootUrl + '/shopping-cart/remove-from-cart',
}

/**
 * Set user's cartId
 */
router.post(urls.addProductToCart, async (req, res) => {
    let cart_id = req.cookies.cart_id;
    if(!cart_id){
        cart_id = await cart.setUserCartId(res);
        console.log(cart_id);
    }
    try {
        const shoppingCart = await cart.addProductToCart(cart_id, req.body);                
        return res.json(shoppingCart);
    } catch (error) {
        return res.json(error);
    }
});

router.post(urls.updateProductInCart, async (req, res) => {
    try {
        const result = await cart.updateCartRecord(req.body);                
        return res.json(result);
    } catch (error) {
        return res.json(error);
    }
});

router.get(urls.getShoppingCart, async (req, res) => {
    try{
        const shoppingCart = await cart.getCartRecords(req.cookies.cart_id);
        return res.json(shoppingCart);
    } catch (error) {
        return res.json(error);
    }
})

router.post(urls.removeProductFromCart, async (req, res) => {
    try {
        const result = await cart.removeProductFromCart(req.body.item_id);
        res.json({result})
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;