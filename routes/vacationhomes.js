var express = require('express');
var router = express.Router();
var Vacationhome = require('../models/vacationhome');
var middleware = require('../middleware');
var NodeGeocoder = require('node-geocoder');

var options = {
	provider: 'google',
	httpAdapter: 'https',
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null
};

var geocoder = NodeGeocoder(options);

//INDEX - show all campgrounds
router.get('/', function(req, res) {
	// Get all vacationhomes from DB
	Vacationhome.find({}, function(err, allVacationhomes) {
		if (err) {
			console.log(err);
		} else {
			res.render('vacationhomes/index', {
				vacationhomes: allVacationhomes,
				page: 'vacationhomes'
			});
		}
	});
});

//CREATE - add new vacationhome to DB
router.post('/', middleware.isLoggedIn, function(req, res) {
	// get data from form and add to vacationhomes array
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var location = req.body.location;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	geocoder.geocode(req.body.location, function(err, data) {
		if (err || !data.length) {
			req.flash('error', 'Invalid address');
			return res.redirect('back');
		}
		var lat = data[0].latitude;
		var lng = data[0].longitude;
		var location = data[0].formattedAddress;
		var newVacationhome = {
			name: name,
			image: image,
			price: price,
			description: desc,
			author: author,
			location: location,
			lat: lat,
			lng: lng
		};
		// Create a new vacationhome and save to DB
		Vacationhome.create(newVacationhome, function(err, newlyCreated) {
			if (err) {
				console.log(err);
			} else {
				//redirect back to vacationhomes page
				console.log(newlyCreated);
				res.redirect('/vacationhomes');
			}
		});
	});
});

//NEW - show form to create new vacationhome
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('vacationhomes/new');
});

// SHOW route - shows more info about a single instace of vacationhome
router.get('/:id', function(req, res) {
	//find the vacationhomes with provided ID
	Vacationhome.findById(req.params.id)
		.populate('comments')
		.exec(function(err, foundVacationhome) {
			if (err) {
				console.log(err);
			} else {
				console.log(foundVacationhome);
				//render show template with that vacationhome
				res.render('vacationhomes/show', { vacationhome: foundVacationhome });
			}
		});
});

// EDIT vacationhome route
router.get('/:id/edit', middleware.checkVacationhomeOwnership, function(req, res) {
	Vacationhome.findById(req.params.id, function(err, foundVacationhome) {
		res.render('vacationhomes/edit', { vacationhome: foundVacationhome });
	});
});

// UPDATE vacationhome route
router.put('/:id', middleware.checkVacationhomeOwnership, function(req, res) {
	geocoder.geocode(req.body.location, function(err, data) {
		if (err || !data.length) {
			req.flash('error', 'Invalid address');
			return res.redirect('back');
		}
		 req.body.vacationhome.lat = data[0].latitude;
    req.body.vacationhome.lng = data[0].longitude;
    req.body.vacationhome.location = data[0].formattedAddress;

    Vacationhome.findByIdAndUpdate(req.params.id, req.body.vacationhome, function(err, vacationhome){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/vacationhomes/" + vacationhome._id);
        }
    });
//  });
//});

		//	find and update the correct vacationhome
		Vacationhome.findByIdAndUpdate(req.params.id, newData, function(err, vacationhome) {
			if (err) {
				req.flash('error', err.message);
				res.redirect('back');
			} else {
				req.flash('success', 'Successfully Updated!');
				res.redirect('/vacationhomes/' + vacationhome._id);
			}
		});
	});
});

//DELETE vacationhome route.
router.delete('/:id', middleware.checkVacationhomeOwnership, function(req, res) {
	Vacationhome.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect('/vacationhomes');
		} else {
			res.redirect('/vacationhomes');
		}
	});
});
		
module.exports = router;
				