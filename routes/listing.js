const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync"); //Requiring the wrapAsync function for handling our asynchronous errors
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings"); //Controller file
//Requiring Multer
const multer  = require('multer');
const {storage} = require("../cloudConfig");
const upload = multer({ storage });




router.route("/")
    .get(wrapAsync(listingController.index)) //Index Route
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing)); //Create Route(For adding the form data and creating a new listing out of it and storing it in the database)

//New Route(For rendering the form to create a new Listing)
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    // Update Route(For updating the updations of the listing in the database)
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    .get(wrapAsync(listingController.showListing)); //Show route

//Edit Route(For rendering the edit form)
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListingForm));

//Delete Route
router.delete("/:id/delete", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;