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
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		companyname: req.body.companyname,
		contactno: req.body.contactno,
		type: 1
	};
	
	userModel.insert(user,function(status){
		if(status){
			res.redirect('/Admin_home/userlist');
		}else{
			res.render('user/create');
		}
	});
});

router.get('/edit/:id', (req, res)=>{
	
	userModel.getById(req.params.id,function(result){
			var user = {
				name: result.name,
				username: result.username,
				password: result.password,
				companyname: result.companyname,
				contactno: result.contactno,
				type: 1
			};
			res.render('user/edit', user);
	});
});

router.post('/edit/:id', (req, res)=>{
	var user = {
		id:req.params.id,
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		companyname: req.body.companyname,
		contactno: req.body.contactno,
		type: 1
	};
	userModel.update(user,function(status){
		if(status){
			res.redirect('/Admin_home/userlist');
		}
		else{
			res.render('user/edit', user);
		}
	});
});

router.get('/delete/:id', (req, res)=>{
	userModel.getById(req.params.id,function(result){
		var user = {
			name: result.name,
			username: result.username,
			password: result.password,
			companyname: result.companyname,
			contactno: result.contactno,
			type: 1
		};
		res.render('user/delete', user);
	});
});

router.post('/delete/:id', (req, res)=>{
	userModel.delete(req.params.id,function(status){
		if(status){
			res.redirect('/Admin_home/userlist');
		}
	});
});

module.exports = router;

