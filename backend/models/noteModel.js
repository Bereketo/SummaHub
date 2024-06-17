const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title']
    },
    content: {
        type: String,
        required: [true, 'Please enter content']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // This option will add `createdAt` and `updatedAt` fields
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
