var express = require('express');
var router = express.Router();
const bodyParser=require('body-parser');
var connection  =  require('./config.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login',{"message":""});
  next();
});
router.post('/',function(req,res,next){
  var email = req.body.email;
	var password = req.body.password;
  connection.query(("SELECT * FROM users where email=? AND password=?"),[email,password],function(error,results,fields){
    if (results.length > 0) {
				//console.log('You are logged in.');
        loggedin=true;
        user_id = results[0].id;
        console.log(user_id);
        username = results[0].name;
        res.redirect('/dashboard');
			} else {
				res.render('login',{"message":"Incorrect ID or password"});
			}			
		});
});

module.exports = router;
