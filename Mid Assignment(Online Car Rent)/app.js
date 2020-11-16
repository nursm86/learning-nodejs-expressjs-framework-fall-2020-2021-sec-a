//declaration
const express 			= require('express');	
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');
const login				= require('./controllers/login');
const app				= express();
const port				= 3000;

//configuration
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));

app.use('/login', login);

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});