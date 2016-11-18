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
var models = require('./models');

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

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', controllers);

app.use(function(req, res, next){
	var err = new Error("Not found.");
	err.status = 404; 
	next(err); 
});

app.set('port', process.env.PORT || 3000); 

//Sequelize stuff goes here. 