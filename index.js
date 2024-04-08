if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
const dbUrl = process.env.ATLASDB_URL;
const express = require("express");//Requiring express
const app = express();
const port = 8080;
const mongoose = require("mongoose"); //Requiring mongoose for database
const path = require("path");
const methodOverride = require("method-override"); //Requiring method override for handling patch and delete requests
const ejsMate = require("ejs-mate"); //Requiring ejs-mate for creating templates
const ExpressError = require("./utils/ExpressError"); //Requiring express error for our custom error handling
const session = require("express-session"); //For handling our sessions
const flash = require("connect-flash"); //Requiring flash for flashing important messages
const MongoStore = require('connect-mongo');

//Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600
})
store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
})
//Declaring the session options
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
}



app.use(session(sessionOptions)); //Middleware for using sessions
app.use(flash()); //Middleware for flash

//Middleware for passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // use static authenticate method of model in LocalStrategy
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware for defining our locals
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


//Requiring the routes
const listings = require("./routes/listing");
const reviews = require("./routes/review");
const users = require("./routes/user");
const category = require("./routes/category");

//Setting up the Mongoose(MongoDB) connection

 

main()
    .then(()=>{
        console.log("Connected to Database");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}
//Defining our middlewares
app.set("view engine", "ejs"); //This is to set the view engine to ejs
app.set("views", path.join(__dirname, "views")); //This is used to set views if the server is started from a different directory
app.use(express.urlencoded({extended: true})); //This helps to access the parameters from the routes
app.use(methodOverride("_method")); //This is to use the method-override package
app.engine("ejs", ejsMate); //To use ejs mate
app.use(express.static(path.join(__dirname, "public"))); //This is used to serve our static files

//Connecting the different routes
app.use("/listings", listings);
app.use("/listings/:id/review", reviews);
app.use("/listing", category);
app.use("/", users);


//Error handler if the request doesnot matches with any of the routes present above
app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page not Found!!"));
});
//Error Handling Middleware
app.use((err, req, res, next)=>{
    let {status = 500, message = "Something went wrong"} = err;
    res.status(status).render("error.ejs", {message});
});

//Setting the server
app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
});
