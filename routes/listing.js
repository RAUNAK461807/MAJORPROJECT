 const express = require("express");
 const router = express.Router();
 const wrapAsync=require("../utils/wrapAsync.js");

 const Listing = require("../models/listing.js");
 const {isLoggedIn, isOwner,validateListing}=require("../middleware.js")
 const ListingControllers= require("../controllers/listing.js")
const multer  = require('multer');
const{storage}= require("../cloudConfig.js")
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(ListingControllers.index))
 .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(ListingControllers.createListings));

 
 //New Route
 router.get("/new", isLoggedIn,ListingControllers.renderNewForm);
 

 router.route("/:id")
.get(  wrapAsync(ListingControllers.showListings))
.put(  isLoggedIn, isOwner,upload.single('listing[image]'),validateListing, wrapAsync(ListingControllers.updateListings))
.delete( isLoggedIn,isOwner, wrapAsync(ListingControllers.destroyListings));

 
 
 //Edit Route
 
 router.get("/:id/edit",  isLoggedIn,isOwner, wrapAsync(ListingControllers.editListings));
 
 


 module.exports= router;