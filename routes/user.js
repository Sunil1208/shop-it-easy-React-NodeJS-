const express = require('express');
const router = express.Router();

const {getUserById, getUser, getAllUser, updateUser , userPurchase} = require('../controllers/user')
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth')


router.param('userId', getUserById)

router.get('/user/:userId', getUser )

router.get('/getAllUsers',getAllUser)

router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);

router.get('/orders/user/:userId', isSignedIn, isAuthenticated, userPurchase)

module.exports = router;