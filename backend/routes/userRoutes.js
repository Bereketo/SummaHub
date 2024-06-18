const express = require('express');
const UserController = require('../controllers/userController')
const AuthController = require('../controllers/authController');



const router = express.Router()
router.post('/signup', AuthController.signup)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.post('/forgotPassword', AuthController.forgotPassword)
router.patch('/resetPassword/:token', AuthController.resetPassword)

router.use(AuthController.protect)

router.patch('/updatePassword/:id', AuthController.updatePassword)
router.get('/me', UserController.getMe, UserController.getUser)
router.patch('/updateMe', UserController.uploadUserPhoto,UserController.resizeUserPhoto, UserController.updateMe)
router.delete('/deleteMe', UserController.deleteMe)

router.use(AuthController.restrictTo('admin'))
router.route('/').get(UserController.getAllusers)
router.route('/:id')
    .patch(UserController.deleteUser)
    .patch(UserController.updateUser)
    .get(UserController.getUser)
module.exports = router