const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');
const factory = require('./handlerFactory');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        if (allowedFields.includes(key)) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
};

class UserController {
    uploadUserPhoto = upload.single('photo');

    resizeUserPhoto = catchAsync(async (req, res, next) => {
        if (!req.file) {
            return next();
        }
        req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/users/${req.file.filename}`);

        next();
    });

    getAllusers = factory.getAll(User);
    updateUser = factory.updateOne(User);
    deleteUser = catchAsync(async (req, res, next) => {
        // Soft delete: Update isDeleted to true
        const doc = await User.findByIdAndUpdate(
            req.params.id,
            { active: false },
            { new: true }
        );

        if (!doc) {
            return next(new AppError('No document found with this ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    });

    getUser = factory.getOne(User);
    getMe = (req, res, next) => {
        req.params.id = req.user.id;
        next();
    };

    updateMe = catchAsync(async (req, res, next) => {
        if (req.file) {
            console.log(req.file);
        }
        if (req.body.password || req.body.passwordConfirm) {
            return next(new AppError('This route is not for updating password, please use /updatePassword for that!', 400));
        }
        const filteredBody = filterObj(req.body, 'firstname', 'lastname', 'email');
        if (req.file) {
            filteredBody.photo = req.file.filename;
        }
        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'Success',
            data: {
                user: updatedUser
            }
        });
    });

    trashedUser = catchAsync(async (req, res, next) => {
        const page = parseInt(req.query.page, 10) || 1;
        const limitValue = parseInt(req.query.limit, 10) || 6;
        const skipValue = (page - 1) * limitValue;

        const users = await User.find({ active: false })
            .skip(skipValue)
            .limit(limitValue)
            .sort({ createdAt: 'desc' });

        const totalDocs = await User.countDocuments({ active: false });

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            result: users.length,
            data: users,
            totalPages: Math.ceil(totalDocs / limitValue),
            currentPage: page
        });
    });
    restoreUser = catchAsync(async (req, res, next) => {
        const doc = await User.findByIdAndUpdate(
            req.params.id,
            { active: true },
            { new: true }
        );

        if (!doc) {
            return next(new AppError('No document found with this ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: null
        });
    });


    deleteMe = catchAsync(async (req, res, next) => {
        await User.findByIdAndUpdate(req.user.id, { active: false }, { new: true, runValidators: true });

        res.status(204).json({
            status: 'Success',
            user: null
        });
    });
}

module.exports = new UserController();
