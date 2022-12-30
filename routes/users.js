const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const user = require('../controllers/users');



router.route('/register')
      .get(user.register)
      .post(user.pregister)

router.route('/login')
      .get(user.login)
      .post(passport.authenticate('local', {successRedirect:'/', failureRedirect: '/login'}), user.plogin)

router.get('/about-us', user.aboutUs);

router.get('/wishlist', user.wishlist);

router.get('/logout', user.logout);

router.get('/cart', user.cart);

router.get('/:id/addcart', user.addcart);

router.get('/:id/deleteCart', user.deleteCart);

router.post('/checkout', user.checkout);

module.exports = router
