const User = require('../../models/customer');
const ShippingRegion = require('../../models/shipping_region');

/* Model associations */
User.belongsTo(ShippingRegion, {foreignKey: 'shipping_region_id'});

/**
 * GET a list of users in DB
 */
const getUsers = async ()=> {
    try{
        const users = await User.findAll();
        return users;
    } catch(error){
        throw error;
    }
};

/**
 * GET a user matching the provided ID
 * @param {String} customer_id 
 */
const getUser = async (customer_id)=>{
    try{
        const user = await User.findOne({
            where: {
                customer_id
            }
        })
        if(!user) {
            throw {status: 404, message: 'User not found'};
        }
        return user;
    }catch(error){
        throw error;
    }
}

module.exports = {
    getUsers,
    getUser
}