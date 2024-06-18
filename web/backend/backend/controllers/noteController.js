const factory = require('./handlerFactory')
const Note = require('../models/noteModel')
const catchAsync = require('../utils/catchAsync')
exports.getAllNotes = factory.getAll(Note)
exports.getNote = factory.getOne(Note)
exports.createNote = catchAsync(async (req, res, next) => {

        // Extract user ID from JWT token
        const userId = req.user._id;

        // Create a new note using the extracted user ID
        const newNote = await Note.create({
            title: req.body.title,
            content: req.body.content,
            user: userId
        });

        res.status(201).json({
            status: 'success',
            data: {
                note: newNote
            }
        });
   
});
exports.updateNote = factory.updateOne(Note)
exports.deleteNote = factory.deleteOne(Note)
