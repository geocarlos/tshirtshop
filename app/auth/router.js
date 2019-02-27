const express = require('express');
const router = new express.Router({});
const passport = require('passport')

router.post('/auth/sign-up', passport.authenticate('local-signup', {
    successRedirect: '/api/signup?q=success',
    failureRedirect: '/api/sogmiṕ?q=failure'
}));

router.post('/auth/sign-in', passport.authenticate('local-signin', {
    successRedirect: '/api/signin?q=success',
    failureRedirect: '/api/signin?q=failure'
}));

module.exports = router;