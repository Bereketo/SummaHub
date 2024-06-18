const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/noteController');
const AuthController = require('../controllers/authController');

router.use(AuthController.protect);
router.use(AuthController.restrictTo('user'))
router.route('/')
    .post(NoteController.createNote)
    .get(NoteController.getAllNotes)
router.route('/trash')
    .get(NoteController.trashedNotes);

router.route('/:id')
    .patch(NoteController.updateNote)
    .patch(NoteController.deleteNote)
    .get(NoteController.getNote)

module.exports = router;