var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res) {
	res.render('hello', { title: 'Hello World!' });
});

router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e, docs) {
		res.render('userlist', {
			"userlist": docs
		});
	});
});

router.get('/newuser', function(req, res) {
	res.render('newuser', { title: 'Add New User'});
});

router.post('/adduser', function(req, res) {
	// set internal db vatiable
	var db = req.db;

	//get form value
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	// set collection
	var collection = db.get('usercollection');

	// submit to db
	collection.insert({
		"username": userName,
		"email": userEmail
	}, function (err, doc) {
		if (err) {
			res.send("db error");
		} else {
			// if it worked, set the header so the addr bar doesn't say /adduser
			res.location("userlist");
			// redirecting
			res.redirect("userlist");
		}
	});
});
module.exports = router;
