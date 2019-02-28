const Order = require('../../models/orders');
const OrderDetail = require('../../models/order-detail');
const Product = require('../../models/product');

/* Model associations */
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id' })

 
module.exports = {
    
}
