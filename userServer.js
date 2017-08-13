var express    =require('express');
var app        =express();
var bodyParser =require('body-parser');
var passport = require('passport'); 
var authController = require('./auth.js');

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
var port = process.env.PORT ||8080;

var router = express.Router();
router.get('/',function(req, res){    
    res.json({ message:'Welcome to our user!'});
});

app.use('/', router);
app.listen(port);
console.log('Welcome to our user API! '+ port);


var mongoose   =require('mongoose');
mongoose.connect('mongodb://dayya3:password123@ds013014.mlab.com:13014/user1')


var User = require('./user.js');

router.post('/register', function(req, res){
	if (!req.body.username ||
	!req.body.password){
		res.status(400);
		res.json({errors: "Bad Request"});
	}
	else{
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.save(function(err){
			if (err)
				res.json({error:err});
			res.json({message: "Registered as " +req.body.username})
		});
	}
});

router.route('/login')
	.get(authController.isAuthenticated,function(req, res){
		res.json({message: "Verification Succesful!"});
	});



