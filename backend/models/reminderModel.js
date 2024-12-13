const mongoose = require('mongoose');
const reminderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title']
    },
    description: {
        type: String,
        required: [true, 'Please enter description']
    },
    date: {
        type: Date,
        required: [true, 'Please enter a date']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: String,
        required: [true, 'Please enter a time']
    }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;

