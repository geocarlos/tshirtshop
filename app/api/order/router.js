const express = require('express');
const router = new express.Router({});
const order = require('./order');

/* URLS */
const rootUrl = '/api'
const urls = {
    getOrders: rootUrl + '/orders'
}

/**
 * Set user's cartId
 */
router.use(urls.getOrders, async (req, res) => {
    res.json({message: 'This will return all orders'});
})

module.exports = router;