// SCHEMA SETUP
var mongoose = require("mongoose");

var vacationhomeSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Vacationhome", vacationhomeSchema);