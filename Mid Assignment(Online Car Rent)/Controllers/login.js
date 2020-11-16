const express 		= require('express');
const session 		= require('express-session');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(status){
		if(status.type == 0){
			res.cookie('uid', status.id);
			res.cookie('type',status.type);
			res.redirect('/Admin');
		}
		else if(status.type == 1){
			res.cookie('uid', status.id);
			res.cookie('type',status.type);
			res.redirect('/user');
		}
		else{
			res.redirect('/login');
		}
	});
});

router.get('/signup', (req, res)=>{
	res.render('login/signup',{msg:""});
});

router.post('/signup', (req, res)=>{
	var user = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		address: req.body.address,
		contactno: req.body.contactno,
		type: 1
	};

	if(req.body.password != req.body.cpassword){
		res.render('login/signup',{msg:"Password Doesn't Match"});
	}
	
	userModel.insert(user,function(status){
		if(status){
			res.redirect('/login');
		}else{
			res.render('login/signup',{msg:"Sign Up was not successfull"});
		}
	});
});

module.exports = router;