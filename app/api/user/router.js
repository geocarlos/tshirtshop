const express = require('express');
const router = new express.Router({});
const User = require('../../models/customer');
const ShippingRegion = require('../../models/shipping_region');

const rootUrl = '/api';
const urls = {
    getUsers: rootUrl + '/users',
    getUser: rootUrl + '/user/:id([A-Z0-9]+)'
}

User.hasOne(ShippingRegion, {foreignKey: 'shipping_region_id'});

/* --- Handlers --- */
const handleGetUsers = async (req, res)=> {
    try{
        const users = await User.findAll();
        return res.json(users);
    } catch(error){
        return res.json({error})
    }
};

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

/* --- Routes --- */
router.get(urls.getUsers, handleGetUsers)
router.get(urls.getUser, handleGetUser)


module.exports = router;