var mongoose = require("mongoose");
var Vacationhome = require("./models/vacationhome");
var Comment   = require("./models/comment");

 var data = [
	 // {
	 // name: "Cloud's Rest", 
	 // image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
	 // description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
	 // },
	 
	 // {
	 // name: "Canyon Floor", 
	 // image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
	 // description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culp qui officia deserunt mollit anim id est laborum"
	 // }
 ]

//Start comments
function seedDB(){
   //Remove all vacationhomes
   Vacationhome.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed vacationhomes!");
         //add a few vacationhomes
        data.forEach(function(seed){
            Vacationhome.create(seed, function(err, vacationhome){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a vacationhome");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                vacationhome.comments.push(comment);
                                vacationhome.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
};

module.exports = seedDB;