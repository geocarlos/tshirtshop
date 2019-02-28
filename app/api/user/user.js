const User = require('../../models/customer');
const ShippingRegion = require('../../models/shipping-region');

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

/**
 * Update user's data
 * @param {Object} data e.g. The resquest body 
 */
const updateUser = async data => {
    try {
        return await User.update({
            name: data.name,
            email: data.email,
            credit_card: data.credit_card,
            address_1: data.address_1,
            address_2: data.address_2,
            city: data.city,
            region: data.region,
            postal_code: data.postal_code,
            country: data.country,
            day_phone: data.day_phone,
            eve_phone: data.eve_phone,
            mob_phone: data.mob_phone
        },
        {
            where: {
                customer_id: data.customer_id
            }
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser
}