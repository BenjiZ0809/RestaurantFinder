const express = require("express");
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/catchAsync");
const Restaurant = require("../models/restaurant");
const Review = require("../models/review");
const {reviewSchema} = require("../schemas.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware")
const reviews = require("../controllers/reviews");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync (reviews.deleteReview));

module.exports = router;