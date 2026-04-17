const reviewModel = require("../models/reviewModel");
const factory = require("./handlersFactory");



// @desc    Get Reviews
// @route   GET /api/v1/reviews
// @access  Public
const getReviews = factory.getAll(reviewModel , "reviews")


// @desc    Get Single Review
// @route   Get /api/v1/reviews/id
// @access  Public


const getReview = factory.getOne(reviewModel);
// @desc     Create Review
// @route    POST /api/v1/reviews
// @access   Private

const createReview = factory.createOne(reviewModel)


// @desc    Update Reviews
// @route   PATCH /api/v1/reviews/id
// @access  Private

const updateReview = factory.updateOne(reviewModel);

// @desc    delete Reviews
// @route   DELETE /api/v1/reviews/id
// @access  Private

const deleteReview = factory.deleteOne(reviewModel);

module.exports = { getReviews , getReview , createReview , updateReview, deleteReview};