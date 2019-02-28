const express = require('express');
const router = new express.Router({});

const user = require('./user');

const rootUrl = '/api';
const urls = {
    getUsers: rootUrl + '/users',
    getUser: rootUrl + '/user/:id([A-Z0-9]+)',
    postUserSignup: rootUrl + '/user',
    updateUserDetails: rootUrl + '/user/update'
}

/**
 * GET all users
 */
router.get(urls.getUsers, async (req, res) => {
    try {
        const users = await user.getUsers();
        return res.json(users);
    } catch (error) {
        return res.status(error.status || 401).json(error)
    }
});

/**
 * GET a user by ID
 */
router.get(urls.getUser, async (req, res) => {
    try {
        const customer = await user.getUser(req.params.id);
        return res.json(customer);
    } catch (error) {
        return res.status(error.status || 401).json(error)
    }
});

/**
 * Update user details
 */
router.use(urls.updateUserDetails = async (req, res) => {
    if(!req.isAuthenticated()){
        return res.status(401).json({error: "User is not logged in."});
    }
    try {
        const result = await user.updateUser(req.body);
        return res.json(result);
    } catch (error) {
        return res.json(error);
    }
})

module.exports = router;