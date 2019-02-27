const User = require('../../models/customer');
const ShippingRegion = require('../../models/shipping_region');

User.hasOne(ShippingRegion, {foreignKey: 'shipping_region_id'});

/**
 * GET a list of users in DB
 * @param {Object} req 
 * @param {Object} res 
 */
const handleGetUsers = async (req, res)=> {
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
const handleGetUser = async (req, res)=>{
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

const handleUserSignUp = async (req, res) =>{
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        credit_card: req.body.credit_card || null,
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        region: req.body.region,
        postal_code: req.body.postal_code,
        country: req.body.country,
        day_phone: req.body.day_phone,
        eve_phone: req.body.eve_phone,
        mob_phone: req.body.mob_phone
    })
}

module.exports = {
    handleGetUsers,
    handleGetUser,
    handleUserSignUp
}