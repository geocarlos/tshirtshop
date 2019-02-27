const express = require('express');
const router = new express.Router({});

const user = require('./user');

const rootUrl = '/api';
const urls = {
    getUsers: rootUrl + '/users',
    getUser: rootUrl + '/user/:id([A-Z0-9]+)',
    postUserSignup: rootUrl + '/user'
}

/* --- Routes --- */
router.get(urls.getUsers, async (req, res) => {
    try {
        const users = await user.getUsers();
        return res.json(users);
    } catch (error) {
        return res.status(error.status || 401).json(error)
    }
});
router.get(urls.getUser, async (req, res) => {
    try {
        const customer = await user.getUser(req.params.id);
        return res.json(customer);
    } catch (error) {
        return res.status(error.status || 401).json(error)
    }
});


module.exports = router;