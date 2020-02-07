var express = require("express");
// var router  = express.Router({mergeParams: true});
var router  = express.Router();
var Vacationhome = require("../models/vacationhome");

//INDEX - show all vacationhomes
router.get("/", function(req, res){
	// Get all vacationhomes from DB
    Vacationhome.find({}, function(err, allVacationhomes){
       if(err){
           console.log(err);
       } else {
    	res.render("vacationhomes/index",{vacationhomes:allVacationhomes});
	   }
    });
});

//CREATE - add new vacationhome to DB
router.post("/", isLoggedIn, function(req, res){
    // get data from form and add to vacationhomes array
    var name = req.body.name;
    var image = req.body.image;
	var desc = req.body.description;
	var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newVacationhome = {name: name, image: image, description: desc, author:author}
	 // Create a new vacationhome and save to DB
	Vacationhome.create(newVacationhome, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
    //redirect back to vacationhomes page
	console.log(newlyCreated);
    res.redirect("/vacationhomes");
		}
	});
});

//NEW - show form to create new vacationhome
router.get("/new", isLoggedIn, function(req, res){
   res.render("vacationhomes/new"); 
});

// SHOW route - shows more info about one vacationhome
router.get("/:id", function(req, res){
//find the vacationhomes with provided ID
    Vacationhome.findById(req.params.id).populate("comments").exec(function(err, foundVacationhome){
        if(err){
            console.log(err);
        } else {
			console.log(foundVacationhome);
            //render show template with that vacationhome
            res.render("vacationhomes/show", {vacationhome: foundVacationhome});
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;