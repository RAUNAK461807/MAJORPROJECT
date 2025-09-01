 const express = require("express");
  const router = express.Router({mergeParams: true});
  const wrapAsync=require("../utils/wrapAsync.js");
  const ExpressError=require("../utils/ExpressError.js");
  const {reviewSchema}=require("../schema.js");
  
const Review = require("../models/review.js");
const Listing = require("../models/listing.js"); 
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const ReviewControllers= require("../controllers/review.js");



  //Review
  //post route
  router.post("/",isLoggedIn,validateReview,wrapAsync( ReviewControllers.createReview));
  
  //Delete Review Route
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(ReviewControllers.destroyReview));


            module.exports = router;