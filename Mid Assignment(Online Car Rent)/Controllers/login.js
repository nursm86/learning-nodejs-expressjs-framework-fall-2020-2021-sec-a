const express 		= require('express');
const session 		= require('express-session');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	var err = {
		err_msg : req.session.errmsg
	};
	res.render('login/index',err);
});

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(status){
		if(status.length > 0 ){
			res.cookie('uid', status[0].id);
			res.cookie('type',status[0].type);
			req.session.uid = status[0].id;
			req.session.type = status[0].type;
			if(status[0].type == 0){
				res.redirect('/Admin');
			}
			else if(status[0].type == 1){
				res.redirect('/user');
			}
		}
		else{
			req.session.errmsg = "UserName or Password is not right";
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
	}else{
		userModel.insert(user,function(status){
			if(status){
				req.session.errmsg = "Account Has been Create Please log in to your account";
				res.redirect('/login');
			}else{
				res.render('login/signup',{msg:"Sign Up was not successfull"});
			}
		});
	}
});

module.exports = router;