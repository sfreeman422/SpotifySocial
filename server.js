//Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var hbs = require('express-handlebars');
var request = require('request');
var queryString = require('querystring');
var port = 3000 || process.env.PORT; 

//Controllers
//This section will eventually import the controller whcih holds our routes

//Express settings
//=========================================//
var app = express();

app.use(methodOverride('_method'));
app.use(session({secret: 'spotify', cookie: {maxAge: 60000}}));
app.use(cookieParser()); 

//Handlebars Setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Controller section
// app.use('/', mainControl);

//Forwards errors to the Error Handler
app.use(function(req, res, next){
	var err = new Error("Not found.");
	err.status = 404; 
	next(err); 
});

//Error Handler
app.use(function(err, res, next){
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: (app.get('env') === 'development') ? err : {}
	})
})

app.listen(port, function(){
	console.log("Listening on port: "+port);
});
//Sequelize stuff goes here. 

module.exports = app; 