const Reminder = require('../models/reminderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

class ReminderController {
    getAllReminders = catchAsync(async (req, res, next) => {
        const reminders = await Reminder.find({ user: req.user._id }).sort({ date: 1 });

        res.status(200).json({
            status: 'success',
            data: reminders
        });
    });

    getReminder = catchAsync(async (req, res, next) => {
        const reminder = await Reminder.findOne({ _id: req.params.id, user: req.user._id });

        if (!reminder) {
            return next(new AppError('No reminder found with this ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: reminder
        });
    });

    createReminder = catchAsync(async (req, res, next) => {
        const newReminder = await Reminder.create({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            user: req.user._id,
            time:req.body.time
        });
    
        res.status(201).json({
            status: 'success',
            data: newReminder
        });
    });

    updateReminder = catchAsync(async (req, res, next) => {
        const reminder = await Reminder.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!reminder) {
            return next(new AppError('No reminder found with this ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: reminder
        });
    });

    deleteReminder = catchAsync(async (req, res, next) => {
        const reminder = await Reminder.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!reminder) {
            return next(new AppError('No reminder found with this ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}

module.exports = new ReminderController();
