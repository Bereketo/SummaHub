const factory = require('./handlerFactory');
const Note = require('../models/noteModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

class NoteController {
    getAllNotes = catchAsync(async (req, res, next) => {
        const page = parseInt(req.query.page, 10) || 1;
        const limitValue = parseInt(req.query.limit, 10) || 6;
        const skipValue = (page - 1) * limitValue;
        const { limit, skip, page: pg, ...query } = req.query;

        // Ensure we are not fetching soft-deleted notes and only fetching notes for the specific user
        query.isDeleted = { $ne: true };
        query.user = req.user._id; // Add user ID to the query

        const notes = await Note.find(query)
            .sort({ _id: -1 }) // Sort in descending order
            .skip(skipValue)
            .limit(limitValue);

        const totalDocs = await Note.countDocuments(query);

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            result: notes.length,
            data: notes,
            totalPages: Math.ceil(totalDocs / limitValue),
            currentPage: page
        });
    });

    getNote = catchAsync(async (req, res, next) => {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id }); // Add user ID to the query

        if (!note) {
            return next(new AppError('No document found with this ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: note
        });
    });

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

    updateNote = factory.updateOne(Note);
    deleteNote = factory.deleteOne(Note);

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
