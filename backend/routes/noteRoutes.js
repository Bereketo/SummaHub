const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authController = require('../controllers/authController');

router.use(authController.protect);
router.use(authController.restrictTo('user'))
router.route('/')
    .post(noteController.createNote)
    .get(noteController.getAllNotes)
router.route('/trash')
    .get(noteController.trashedNotes);

router.route('/:id')
    .patch(noteController.updateNote)
    .patch(noteController.deleteNote)
    .get(noteController.getNote)

module.exports = router;