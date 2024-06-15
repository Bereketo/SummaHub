const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    // Using findOneAndDelete with a query object to specify the document ID
    const doc = await Model.findOneAndDelete({ _id: req.params.id });
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
    // Parse page and limit from query parameters, defaulting to 1 and 6 respectively
    const page = parseInt(req.query.page, 10) || 1;
    const limitValue = parseInt(req.query.limit, 10) || 6;
    const skipValue = (page - 1) * limitValue;

    // Exclude limit, skip, and page from the query passed to Model.find
    const { limit, skip, page: pg, ...query } = req.query;

    // Log the query parameters for debugging
    console.log('Query:', query);
    console.log('Limit:', limitValue);
    console.log('Skip:', skipValue);

    // Execute the query with pagination
    const doc = await Model.find(query)
        .skip(skipValue)
        .limit(limitValue);

    // Log the documents returned for debugging
    console.log('Documents returned:', doc);

    // Send the response with the documents and metadata
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        result: doc.length,
        data: doc
    });
});


