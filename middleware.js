const Listing = require("./models/listing");
const Review = require("./models/review");
const {listingSchema, reviewSchema} = require("./schema"); //Requiring schema to access the JOI validations
const ExpressError = require("./utils/ExpressError"); //Requiring express error for our custom error handling

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;//Storing the url if the user is not logged-in
        req.flash("error", "You must be logged-in");
        res.redirect("/login");
    }else{
        next();
    }
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have the access to this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor = async(req,res,next)=>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have the access to this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next)=>{
    let result = listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400, result.error);
    }else{
        next();
    }
};


module.exports.validateReview = (req, res, next)=>{
    let result = reviewSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400, result.error);
    }else{
        next();
    }
};