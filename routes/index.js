
var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("home");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
		if(err){
    		console.log(err);
    		return res.render("register", {error: err.message});
		}
        passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome To Vacation Home, You've Successfully Signed Up! " + req.user.username);
           	res.redirect("/vacationhomes"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/vacationhomes",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   	req.logout();
	req.flash("success", "You Are Logged Out!");
   	res.redirect("/vacationhomes");
});

module.exports = router;