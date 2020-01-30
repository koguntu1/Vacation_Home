var express     	= require("express"),
    app         	= express(),
    bodyParser  	= require("body-parser"),
    mongoose		= require("mongoose"),
	Vacationhome	= require("./models/vacationhome"),
	seedDBasync		= require("./seeds"),
	ejsLint			= require("ejs-lint");


mongoose.set("useUnifiedTopology", true); 
mongoose.connect("mongodb://localhost/vacationhome", {useNewUrlParser: true}); 
// mongoose.connect("mongodb://localhost:27017/vacationhome"), {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDBasync();

// var Vacationhome = mongoose.model("Vacation_home", vacationhomeSchema);

 // Vacationhome.create(
 //     {
 //         name: "Granite Hill", 
 //         image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
 //         description: "This is a home on top of a granite hill, no bathroom.  No water. This is a beautiful granite!"
         
 //     },
 //     function(err, vacationhome){
 //      if(err){
 //          console.log(err);
 //      } else {
 //          console.log("NEWLY CREATED VACATION HOME: ");
 //          console.log(vacationhome);
 //      }
 //    });


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
    res.render("index",{vacationhomes:allVacationhomes});
		   }
    });
});

//CREATE - add new vacationhome to DB
app.post("/vacationhomes", function(req, res){
    // get data from form and add to vacationhomes array
    var name = req.body.name;
    var image = req.body.image;
	var desc = req.body.description;
    var newVacationhome = {name: name, image: image, description: desc}
	
	 // Create a new vacationhomes and save to DB
	Vacationhome.create(newVacationhome, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
    // vacationhomes.push(newVacationhome);
    //redirect back to vacationhomes page
    res.redirect("/vacationhomes");
		}
		});
});

//NEW - show form to create new vacationhome
app.get("/vacationhomes/new", function(req, res){
   res.render("new.ejs"); 
});

// SHOW - shows more info about one vacationhome
app.get("/vacationhomes/:id", function(req, res){
//find the vacationhomes with provided ID
    Vacationhome.findById(req.params.id).populate("comments").exec(function(err, foundVacationhome){
        if(err){
            console.log(err);
        } else {
			console.log(foundVacationhome);
            //render show template with that vacationhome
            res.render("show", {vacationhome: foundVacationhome});
        }
    });
})

app.listen(process.env.PORT || 3000, process.env.IP, () => {
   console.log("Server Has Started!!!");
}); 