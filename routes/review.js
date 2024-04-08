const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync"); //Requiring the wrapAsync function for handling our asynchronous errors
const {isLoggedIn, isAuthor, validateReview} = require("../middleware");
const reviewController = require("../controllers/reviews");

//Route for adding reviews
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.addReview));

//Delete route for reviews
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;