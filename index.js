const express = require('express');
const redirect = require('express-redirect');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const { jsonResponse } = require('./utils');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
redirect(app);

var users = [
	{'id': 1, 'email' : 'geoff@mail.com', 'pass' : '123456', 'money' : 5000},
	{'id': 2, 'email' : 'mary@mail.com', 'pass' : '54321', 'money' : 400},
	];

// FUNCTION FOR PARSING HTML FILES
function myHTML(url) {
	return path.join(__dirname+'/views/'+url+'.html');
}
 
// TELL EXPRESS TO USE THE BODY-PARSER MIDDLEWARE AND TO NOT PARSE EXTENDED BODIES
app.use(bodyParser.urlencoded({ extended: false }))

// ROUTING FOR HOMEPAGE
app.get('/', function(req, res, next){
		var cookie = req.cookies.logged;
		console.log(cookie);
		res.sendFile(myHTML('index'));
  		console.log('Displaying Home Page');
});

// ROUTING FOR LOGIN
app.post('/login', function (req, res) {
  var user = req.body.email;
  var pass = req.body.password;
  console.log(`Username: ${user}, Password: ${pass}`);
  users.map(function(u){
  	for (var i=0; i<users.length; i++) {
  		if (users[i].email == user && users[i].pass == pass) {
  			'Login Success'
            res.cookie('logged',users[i].email);
            console.log('cookie have created successfully');
            res.cookie('money',users[i].money);
            console.log('cookie have created successfully');
            cookie = req.cookies.logged;
  			res.redirect('/member');
  			break;
  		}
  	}

  });
  
});

// ROUTING FOR WITHDRAW
app.post('/withdraw', function (req, res) {
  var amount = parseInt(req.body.amount);
  var cur_money = parseInt(req.cookies.money);
  var new_money = cur_money - amount;
  res.cookie('money',new_money);
  res.redirect('/member');
});

// ROUTING FOR DEPOSIT
app.post('/deposit', function (req, res) {
  var amount2 = parseInt(req.body.amount2);
  var cur_money = parseInt(req.cookies.money);
  var new_money = cur_money + amount2;
  res.cookie('money',new_money);
  res.redirect('/member');
});

app.post('/logout', function (req, res) {

  res.clearCookie("money");
  res.clearCookie("logged");
  res.redirect('/member');
});

// ROUTING TO MEMBER'S PAGE
app.get('/member', function(req, res, next){
	cookie = req.cookies.logged;
	money = req.cookies.money;
	if (cookie === undefined) {
		console.log('Not logged in... Redirecting');
		res.redirect('/')
	}
	else {
		console.log('Money: ' + money);
		console.log('Logged in as'+cookie);
		res.sendFile(myHTML('member'));
  		console.log('Displaying Member Page');
	}
});

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});