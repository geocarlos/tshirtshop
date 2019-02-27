const User = require('../../models/customer');
const ShippingRegion = require('../../models/shipping_region');

/* Model associations */
User.belongsTo(ShippingRegion, {foreignKey: 'shipping_region_id'});

/**
 * GET a list of users in DB
 * @param {Object} req 
 * @param {Object} res 
 */
const getUsers = async (req, res)=> {
    try{
        const users = await User.findAll();
        return res.json(users);
    } catch(error){
        return res.json({error})
    }
};

/**
 * GET a user matching the provided ID
 * @param {Object} req 
 * @param {Object} res 
 */
const getUser = async (req, res)=>{
    try{
        const user = await User.findOne({
            where: {
                customer_id: req.params.id
            }
        })
        return res.json(user);
    }catch(error){
        return res.json({error})
    }
}

module.exports = {
    getUsers,
    getUser
}