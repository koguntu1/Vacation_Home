var express = require("express");
var router  = express.Router({mergeParams: true});
var Vacationhome = require("../models/vacationhome");
var Comment = require("../models/comment");

//Comments New
router.get("/new", isLoggedIn, function(req, res){
    // find vacationhome by id
    console.log(req.params.id);
    Vacationhome.findById(req.params.id, function(err, vacationhome){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {vacationhome: vacationhome});
        }
    })
});

//Comments Create
router.post("/",isLoggedIn,function(req, res){
   //lookup vacationhome using ID
   Vacationhome.findById(req.params.id, function(err, vacationhome){
       if(err){
           console.log(err);
           res.redirect("/vacationhomes");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
			   //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               vacationhome.comments.push(comment);
               vacationhome.save();
               console.log(comment); 
               res.redirect('/vacationhomes/' + vacationhome._id);
           }
        });
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