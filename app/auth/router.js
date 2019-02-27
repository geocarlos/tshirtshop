const express = require('express');
const router = new express.Router({});
const passport = require('passport')

router.post('/auth/sign-up', passport.authenticate('local-signup', {
    successRedirect: '/auth/signup?q=success',
    failureRedirect: '/auth/signup?q=failure'
}));

router.post('/auth/sign-in', passport.authenticate('local-signin', {
    successRedirect: '/auth/signin?q=success',
    failureRedirect: '/auth/signin?q=failure'
}));

router.get('/auth/signup', (req, res) => {
    return res.json({signup: req.query.q});
});

router.get('/auth/signin', (req, res) => {
    return res.json({signin: req.query.q});
})

module.exports = router;