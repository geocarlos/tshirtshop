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
router.get(urls.getUsers, user.handleGetUsers);
router.get(urls.getUser, user.handleGetUser);
router.post(urls.postUserSignup, user.handleUserSignUp)


module.exports = router;