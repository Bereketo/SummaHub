const factory = require('./handlerFactory')
const Note = require('../models/noteModel')

exports.getAllNotes = factory.getAll(Note)
exports.getNote = factory.getOne(Note)
exports.createNote= factory.createOne(Note)
exports.updateNote = factory.updateOne(Note)
