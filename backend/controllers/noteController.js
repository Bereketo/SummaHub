const factory = require('./handlerFactory')
const Note = require('../models/noteModel')
const catchAsync = require('../utils/catchAsync')

class NoteController {

getAllNotes = factory.getAll(Note)
getNote = factory.getOne(Note)
createNote = catchAsync(async (req, res, next) => {

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
updateNote = factory.updateOne(Note)
deleteNote = factory.deleteOne(Note)
trashedNotes = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limitValue = parseInt(req.query.limit, 10) || 6;
    const skipValue = (page - 1) * limitValue;

    const notes = await Note.find({ user: req.user.id, isDeleted: true })
        .skip(skipValue)
        .limit(limitValue)
        .sort({ createdAt: 'desc' });

    const totalDocs = await Note.countDocuments({ user: req.user.id, isDeleted: true });

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        result: notes.length,
        data: notes,
        totalPages: Math.ceil(totalDocs / limitValue),
        currentPage: page
    });
});
}

module.exports = new NoteController();