const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    // Soft delete: Update isDeleted to true
    const doc = await Model.findByIdAndUpdate(
        req.params.id,
        { isDeleted: true },
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



exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!doc) {
        return next(new AppError('No document found with this ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    })
})

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            doc: newDoc
        }
    });
})

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
    let query = Model.findOne({ _id: req.params.id })
    if (popOptions) {
        query = query.populate(popOptions);
    }
    const doc = await query

    if (!doc) {
        return next(new AppError('No document found with this ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: doc
    })
})
exports.getAll = Model => catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limitValue = parseInt(req.query.limit, 10) || 6;
    const skipValue = (page - 1) * limitValue;
    const { limit, skip, page: pg, ...query } = req.query;

    // Ensure we are not fetching soft-deleted notes
    query.isDeleted = { $ne: true };

    const doc = await Model.find(query)
        .sort({ _id: -1 }) // Sort in descending order
        .skip(skipValue)
        .limit(limitValue);

    const totalDocs = await Model.countDocuments(query);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        result: doc.length,
        data: doc,
        totalPages: Math.ceil(totalDocs / limitValue),
        currentPage: page
    });
});



