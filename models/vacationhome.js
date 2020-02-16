// SCHEMA SETUP
var mongoose = require("mongoose");

var vacationhomeSchema = new mongoose.Schema({
	name: String,
	image: String,
	price: String,
	description: String,
	createdAt: { type: Date, default: Date.now },
	author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Vacationhome", vacationhomeSchema);