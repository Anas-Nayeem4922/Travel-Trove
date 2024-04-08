const User = require("../models/user");

module.exports.signupForm = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req, res)=>{
    try{
        let {email, username, password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err)=>{
            if(err){
                next(err);
            }
            req.flash("success", "You are registered successfully, Welcome to wanderlust");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm =  (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success", "Welcome back, You are logged-in");
    if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl);
    }else{
        res.redirect("/listings");
    }
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }else{
            req.flash("success", "You are logged-out");
            res.redirect("/listings");
        }
    })
};