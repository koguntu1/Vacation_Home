var express     	= require("express"),
    app         	= express(),
    bodyParser  	= require("body-parser"),
    mongoose		= require("mongoose"),
	Vacationhome	= require("./models/vacationhome"),
	Comment     	= require("./models/comment"),
	ejsLint			= require("ejs-lint"),
	seedDB			= require("./seeds");
 	// seedDBasync		= require("./seeds");

mongoose.set("useUnifiedTopology", true); 
mongoose.connect("mongodb://localhost:27017/vacationhome", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
// seedDBasync();
seedDB();

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
    	res.render("vacationhomes/index",{vacationhomes:allVacationhomes});
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
    //redirect back to vacationhomes page
    res.redirect("/vacationhomes");
		}
	});
});

//NEW route - show form to create new vacationhome
app.get("/vacationhomes/new", function(req, res){
   res.render("vacationhomes/new"); 
});

// SHOW route - shows more info about one vacationhome
app.get("/vacationhomes/:id", function(req, res){
//find the vacationhomes with provided ID
    Vacationhome.findById(req.params.id).populate("comments").exec(function(err, foundVacationhome){
        if(err){
            console.log(err);
        } else {
			console.log(foundVacationhome);
            //render show template with that vacationhome
            res.render("vacationhomes/show", {vacationhome: foundVacationhome});
        }
    });
});

// COMMENTS ROUTES
app.get("/vacationhomes/:id/comments/new", function(req, res){
    // find vacation by id
    Vacationhome.findById(req.params.id, function(err, vacationhome){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {vacationhome: vacationhome});
        }
    });
});

app.post("/vacationhomes/:id/comments", function(req, res){
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
               vacationhome.comments.push(comment);
               vacationhome.save();
               res.redirect('/vacationhomes/' + vacationhome._id);
           }
        });
	 }
  });
});
app.listen(process.env.PORT || 3000, process.env.IP, () => {
   console.log("Server Has Started!!!");
});