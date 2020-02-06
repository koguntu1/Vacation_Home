var mongoose = require("mongoose");
var Vacationhome = require("./models/vacationhome");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "The main home features 2 bedrooms with deluxe queen beds. The master has a Stearns and Foster queen 		mattress and the second bedroom has a high-end memory foam queen mattress. These bedrooms and the living room have 		outstanding water views. The 3rd bedroom features a newly purchased bunkbed and mattresses. The bunkbed can be separated into two single beds. The futon is also located in the third 	bedroom. Our home features a fully stocked kitchen with brand new appliances. Freshly painted with new carpets, this 1946 built home still has a cabin-like feel with big fire place providing a warm atmosphere."
    },
	
    {
        name: "Granite Hill", 
	    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "The Granite Hill has a large back porch and deck from which to enjoy the views. The ocean and river views 		from here are timeless and ever changing. There is a set of stairs down to the beach for easy access to walks, up front 		and close wildlife viewing, kayaking, and fishing. Bring your canoe or kayak and take across to the sand split for a 		wilderness beach experience that includes outstanding seasonal surf perch fishing or paddle up the estuary to some fantastic private fishing, swimming, or exploration.!"
    },
	
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "The Canyon Floor can sleep up to 8 people. The main house has beds for 6 people. A full futon can sleep 		two more. The River's End Retreat has great views and features a private deck with area for barbecuing Canyon Floor is a great take off point for all kinds of day trips featuring outdoors activities including the redwoods, the hiking and 	boating and fishing along the Smith River, restaurants in Brookings and exploring the Chetco River and/or the Southern Oregon Coast. You are right in the middle of it all!!!"
    },
	 
	{
		name: "Salmon Creek", 
		image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
		description: "Samon Creek is another beautiful vacation home. A perfect romantic retreat with an expansive open floor 		plan, a hot tub off the bedroom, and breathtaking views from almost every room." 
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
   Vacationhome.deleteMany({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed vacationhomes!");
        //  //add a few vacationhomes
        // data.forEach(function(seed){
        //     Vacationhome.create(seed, function(err, vacationhome){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("added a vacationhome");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Homer"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         vacationhome.comments.push(comment);
        //                         vacationhome.save();
        //                         console.log("Created new comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
    }); 
    //add a few comments
};

module.exports = seedDB;
// module.exports = seedDBasync;