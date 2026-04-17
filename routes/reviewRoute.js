const express = require("express");
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../services/reviewService");
const {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/reviewValidator");
const { protect, allowTo } = require("../services/authService");

const router = express.Router({mergeParams : true});

router
  .route("/")
  .get(getReviews)
  .post(protect, allowTo("user"), createReviewValidator, createReview);

router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .patch(protect, allowTo("user"), updateReviewValidator, updateReview)
  .delete(
    protect,
    allowTo("user", "admin", "manger"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
