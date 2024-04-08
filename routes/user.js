const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");
const ExpressError = require("../utils/ExpressError");

router.route("/signup")
    .get(userController.signupForm) //Route for rendering the signup form
    .post(wrapAsync(userController.signup)); //Route for adding the user in the database

router.route("/login")
    .get(userController.loginForm) //Route for rendering the login form
    //Route for logging in the user
    .post(saveRedirectUrl, passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash: true
    }), wrapAsync(userController.login));

//Route for logging out
router.get("/logout", userController.logout);

module.exports = router;