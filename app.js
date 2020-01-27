var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.set("useUnifiedTopology", true); 
mongoose.connect("mongodb://localhost/vacation_home", {useNewUrlParser: true}); 
//mongoose.connect("mongodb://localhost:27017/vacation_home"), {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var vacationhomeSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Vacationhome = mongoose.model("Vacationhome", vacationhomeSchema);

 Vacationhome.create(
     {
    //      name: "Granite Hill", 
    //      image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
    //      description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"
         
     },
     function(err, vacationhome){
      if(err){
          console.log(err);
      } else {
          console.log("NEWLY CREATED VACATIONHOME: ");
          console.log(vacationhome);
      }
    });

// var vacationhomes = [
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
// ];

app.get("/", function(req, res){
    res.render("home");
});

//INDEX - show all vacationhomes
app.get("/vacationhomes", function(req, res){
	// Get all vacationhomes from DB
    Vacationhome.find({}, function(err, allVacationhomes){
       if(err){
           console.log(err);
       } else {
    res.render("vacationhomes",{vacationhomes:allVacationhomes});
		   }
    });
});

//CREATE - add new vacationhome to DB
app.post("/vacationhomes", function(req, res){
    // get data from form and add to vacationhomes array
    var name = req.body.name;
    var image = req.body.image;
    var newVacationhome = {name: name, image: image}
    vacationhomes.push(newVacationhome);
    //redirect back to vacationhomes page
    res.redirect("/vacationhomes");
});

app.get("/vacationhomes/new", function(req, res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
   console.log("Server Has Started!!!");
}); 