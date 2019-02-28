const Order = require('../../models/orders');
const OrderDetail = require('../../models/order-detail');
const Product = require('../../models/product');

/* Model associations */
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id' });

/**
 * Create an order
 * @param {Object} data The request body 
 */
const createOrder = async (data) => {
    try{
        return await Order.create({
            total_amount: data.total_amount || 0.0,
            comments: data.comments,
            customer_id: data.customer_id,
            shipping_id: data.shipping_id,
            tax_id: data.tax_id
        });
    } catch(error) {
        throw error;
    }
}

/**
 * Place an order - add record to order_detail
 * @param {Object} data 
 */
const placeOrder = async (data) => {
    try {
        const newOrder = await OrderDetail.create({
            order_id: data.order_id,
            product_id: data.product_id,
            _attributes: data._attributes,
            product_name: data.product_name,
            quantity: data.quantity,
            unit_cost: data.unit_cost       
        });
        if(!data.status) {
            await Order.update({
                status: 1,
                total_amount: data.total_amount + data.quantity * data.unit_cost
            },
            {
                where: {
                    order_id: data.order_id
                }
            })
        }
        return newOrder;
    } catch (error) {
        throw error;
    }
}

/**
 * GET all orders
 */
const getAllOrders = async () => {
    try{
        return await Order.findAll();
    } catch (error) {
        throw error;
    }
}

/**
 * GET all order_detail records related to provided ID
 * @param {Number} order_id 
 */
const getOrderByOrderId = async (order_id) => {
    try {
        return await OrderDetail.findAll({
            include: [
                {
                    model: Order,
                    attributes: ['order_id', 'total_amount', 'status']
                }
            ],
            where: {
                order_id
            }
        })
    } catch (error) {
        throw error;
    }
}

/**
 * GET an order maching customer_id
 * @param {Number} customer_id 
 */
const getOrdersByCustomerId = async (customer_id) => {
    try {
        return await Order.findOne({
            include: [
                {
                    model: User,
                    attributes: ['name', 'email', 'address_1']
                },
                {
                    model: Product
                }
            ],
            where: {
                customer_id
            }
        })
    } catch (error) {
        throw error;
    }
}

 
module.exports = {
    createOrder,
    placeOrder,
    getAllOrders,
    getOrderByOrderId,
    getOrdersByCustomerId
}
