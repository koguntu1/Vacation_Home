var express     	= require("express"),
    app         	= express(),
    bodyParser  	= require("body-parser"),
    mongoose		= require("mongoose"),
	flash       	= require("connect-flash"),
	passport    	= require("passport"),
	LocalStrategy 	= require("passport-local"),
	methodOverride 	= require("method-override"),
	Vacationhome	= require("./models/vacationhome"),
	Comment     	= require("./models/comment"),
	User        	= require("./models/user"),
	seedDB			= require("./seeds"),
 	//seedDBasync		= require("./seeds");
	ejsLint			= require("ejs-lint");

//requring routes
var commentRoutes    	= require("./routes/comments"),
    vacationhomeRoutes 	= require("./routes/vacationhomes"),
    indexRoutes      	= require("./routes/index")

mongoose.set("useUnifiedTopology", true); 
// mongoose.connect("mongodb://localhost:27017/rezweb", {useNewUrlParser: true});

mongoose.connect("mongodb+srv://keithog2:Abayomi50@clusterwebdev-7byse.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true
	}).then(() => {
	console.log("Connected to MongoDB!!");
	}).catch(err => {
	console.log('ERROR:', err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();  //seed the database
//seedDBasync();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "My good friend lives in Colorado!",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require("moment"),
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
   console.log("Server Has Started!");
});

// app.listen(3000, () => {
//    console.log("Server Has Started!!");
// });