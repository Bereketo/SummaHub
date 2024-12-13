const express = require('express');
const router = express.Router();
const ReminderController = require('../controllers/remiderController');
const AuthController = require('../controllers/authController');

router.use(AuthController.protect);
router.use(AuthController.restrictTo('user'));

router.route('/')
    .post(ReminderController.createReminder)
    .get(ReminderController.getAllReminders);

router.route('/:id')
    .get(ReminderController.getReminder)
    .patch(ReminderController.updateReminder)
    .delete(ReminderController.deleteReminder);

module.exports = router;
