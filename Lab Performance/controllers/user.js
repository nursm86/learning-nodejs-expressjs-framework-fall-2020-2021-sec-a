const express 	= require('express');
const userModel = require('../models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/create', (req, res)=>{
	res.render('user/create');
});


router.post('/create', (req, res)=>{
	
	var user = {
		username: req.body.username,
		password: req.body.password,
		type: req.body.type
	};
	
	userModel.insert(user,function(status){
		if(status){
			res.redirect('/home/userlist');
		}else{
			res.render('user/create');
		}
	});
});

router.get('/edit/:id', (req, res)=>{

	var user = {
		username: 'test',
		password: 'test',
		email: 'alamin@aiub.edu'
	};
	res.render('user/edit', user);
});

router.post('/edit/:id', (req, res)=>{
	res.redirect('/home/userlist');
});

router.get('/delete/:id', (req, res)=>{
	var user = {username: 'alamin', password: '123', email: 'email@gmail.com'};
	res.render('user/delete', user);
});

router.post('/delete/:id', (req, res)=>{
	res.redirect('/home/userlist');
});

module.exports = router;

