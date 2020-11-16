const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const carModel  = require.main.require('./models/carModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uid'] == null && req.cookies['type'] !=1){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	carModel.getAll(function(results){
		res.render('user/index', {cars: results});
	});
});

router.get('/carinfo/:id', (req, res)=>{
	carModel.getById(req.params.id,function(result){
		var car = {
			name: result.name,
			rentprice: result.rentprice,
			description: result.description,
			type: result.type,
			image: result.image
		};
		res.render('user/carinfo', car);
	});
});

router.post('/carinfo/:id', (req, res)=>{
	carModel.getById(req.params.id,function(result){
		var car = {
			name: result.name,
			rentprice: result.rentprice,
			description: result.description,
			type: result.type,
			image: result.image
		};
		res.render('user/carinfo', car);
	});
});

router.get('/profile',(req,res)=>{
	userModel.getById(req.cookies['uid'],function(result){
		var user = {
			name: result.name,
			username: result.username,
			password: result.password,
			address: result.address,
			contactno: result.contactno
		};
		res.render('user/profile', user);
	});
});

router.get('/edit',(req,res)=>{
	userModel.getById(req.cookies['uid'],function(result){
		var user = {
			name: result.name,
			username: result.username,
			password: result.password,
			address: result.address,
			contactno: result.contactno
		};
		res.render('user/edit', user);
	});
});

router.post('/edit',(req,res)=>{
	var user = {
		id:req.cookies["uid"],
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		address: req.body.address,
		contactno: req.body.contactno
	};
	userModel.update(user,function(status){
		if(status){
			res.redirect('/user/profile');
		}
		else{
			res.render('user/edit', user);
		}
	});
});

module.exports = router;