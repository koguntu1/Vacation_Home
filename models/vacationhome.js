// SCHEMA SETUP
var mongoose = require("mongoose");

var vacation_homeSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

module.exports = mongoose.model("Vacation_home", vacation_homeSchema);