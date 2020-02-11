var Vacationhome = require("../models/vacationhome");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkVacationhomeOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Vacationhome.findById(req.params.id, function(err, foundVacationhome){
           if(err){
				req.flash("error", "Vacationhome not found");
               	res.redirect("back");
           }  else {
               // does user own the vacationhome?
            if(foundVacationhome.author.id.equals(req.user._id)) {
                next();
            } else {
				req.flash("error", "You are not permited for that!");
                res.redirect("back");
            }
           }
        });
    } else {
		req.flash("error", "You must first LOGIN or SUBSCRIBE!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
				req.flash("error", "You are not permited for that!");
                res.redirect("back");
            }
           }
        });
    } else {
		
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error", "You must first LOGIN or SUBSCRIBE!!!");
    res.redirect("/login");
}

module.exports = middlewareObj;