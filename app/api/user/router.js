const express = require('express');
const router = new express.Router({});

const rootUrl = '/api';
const urls = {
    getUsers: rootUrl + '/users',
    getUser: rootUrl + '/user/:id([A-Z0-9]+)'
}

/* --- Handlers --- */
const handleGetUsers = (req, res)=> {
    return res.json({message: "Here we'll send the users!"})
};

const handleGetUser = (req, res)=>{
    return res.json({user_id: req.params.id});
}

/* --- Routes --- */
router.get(urls.getUsers, handleGetUsers)
router.get(urls.getUser, handleGetUser)


module.exports = router;