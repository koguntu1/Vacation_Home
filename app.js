const express 			= require("express"),
	  app 				= express(),
	  bodyParser 		= require("body-parser"),
	  mongoose 			= require("mongoose"),
	  flash 			= require("connect-flash"),
	  passport 			= require("passport"),
	  LocalStrategy 	= require("passport-local"),
	  methodOverride 	= require("method-override"),
	  Vacationhome 		= require("./models/vacationhome"),
	  Comment 			= require("./models/comment"),
	  User 				= require("./models/user"),
	  ejsLint			= require("ejs-lint"),
	  seedDB			= require("./seeds");
		  
//required routes
const commentRoutes 		= require("./routes/comments"),
	  vacationhomeRoutes 	= require("./routes/vacationhomes"),
	  indexRoutes 			= require("./routes/index");
			
mongoose.set("useUnifiedTopology", true); 
// mongoose.connect("process.env.DATABASEURL", {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/vacationhome", {useNewUrlParser: true});

//backups. Having seperate local and deployed databases
const url = process.env.DATABASEURL || "mongodb://localhost/vacationhome";
mongoose.connect(url, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();  //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "My good friend lives in Colorado!",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require("moment");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
   	res.locals.success = req.flash("success");
 	next();
});

app.use("/", indexRoutes);
app.use("/vacationhomes", vacationhomeRoutes);
app.use("/vacationhomes/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
   console.log("Vacation_Home Server Has Started!");
});