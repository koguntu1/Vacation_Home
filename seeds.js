var mongoose = require("mongoose");
var Vacationhome = require("./models/vacationhome");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
	
    {
        name: "Granite Hill", 
	    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"
    },
	
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    },
	 
	{
		name: "Salmon Creek", 
		image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
		description: "Another beatiful scenery " 
	}
]

// async function seedDBasync() {
//     try { await Vacationhome.deleteMany({}) } catch (e) { console.log(e); };
//     data.forEach(async function (seed) {
//         try {
//             const vacationhome = await Vacationhome.create(seed);
//             const comment = await Comment.create({ text: 'This place is great but i wish there was wifi', author: 'Homer' });
//             vacationhome.comments.push(comment);
//             await vacationhome.save();
//         } catch (e) { console.log(e); }
//     });
// };
 
//////////////comment start
function seedDB(){
   //Remove all vacationhomes
   Vacationhome.deleteOne({}, function(err){
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
    //add a few comments
};

module.exports = seedDB;
// module.exports = seedDBasync;