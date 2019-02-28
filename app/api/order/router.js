const express = require('express');
const router = new express.Router({});
const order = require('./order');

/* URLS */
const rootUrl = '/api'
const urls = {
    getOrders: rootUrl + '/orders',
    createOrder: rootUrl + '/order',
    placeOrder: rootUrl + '/order/place',
    getOrderById: rootUrl + '/order/:id([A-Z0-9]+)',
    getOrdersByCustomerId: rootUrl + '/orders/:customer_id([A-Z0-9]+)'
}

/**
 * Set get all orders
 */
router.get(urls.getOrders, async (req, res) => {
    try {
        const orders = await order.getAllOrders();
        return res.json(orders);
    } catch (error) {
        return res.json(error);
    }
})

/**
 * Create an order
 */
router.post(urls.createOrder, async (req, res) => {
    try {
        const newOrder = await order.createOrder(req.body);
        return res.json(newOrder);
    } catch (error) {
        return res.json(error);
    }
});

/**
 * Place order - add record to order_detail
 */
router.post(urls.placeOrder, async (req, res) => {
    try {
        const placedOrder = await order.placeOrder(req.body);
        return res.json(placedOrder);
    } catch (error) {
        return res.json(error);
    }
});

/**
 * GET order_detail records maching provided order_id
 */
router.get(urls.getOrderById, async (req, res) => {
    try {
        const _order = await order.getOrderByOrderId(req.params.id);
        return res.json(_order);
    } catch (error) {
        return res.json(error);
    }
});

/**
 * GET order maching customer_id
 */
router.get(urls.getOrdersByCustomerId, async (req, res) => {
    try {
        const orders = await order.getOrdersByCustomerId(req.body.customer_id);
        return res.json(orders);
    } catch (error) {
        return res.json(error);
    }
})

module.exports = router;