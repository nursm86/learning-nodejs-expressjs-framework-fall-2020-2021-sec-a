const express 	= require('express');
const session = require('express-session');
const rentModel = require('../Models/rentModel');
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
	carModel.getAvailable(function(results){
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

router.get('/renthistory',(req,res)=>{
	rentModel.getById(req.session.uid,function(results){
		res.render('User/history',{rents : results});
	});
});

router.post('/carinfo/:id', (req, res)=>{
	var date = new Date().toISOString().slice(0,10);
	var rent = {
		c_id : req.params.id,
		user_id : req.session.uid,
		date : date,
		total_price: req.body.rentprice,
		p_method : req.body.paymethod,
	};
	rentModel.insert(rent,function(status){
		if(status){
			carModel.booked(req.params.id,function(status){
				res.redirect('/user/renthistory');
			});
		}
		else{
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
		}
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

router.post('/get',(req,res)=>{
	var user = {
		field: req.body.field,
		value : req.body.val	
	};
	userModel.getUserName(user, function(results){
		if(results!=null){
			res.json({flag:true});
		}else{
			res.json({flag:false});
		}
	});
});

router.post('/getCarbyCategory',(req,res)=>{
	var car = {
		see : req.body.see
	};
	carModel.getCarbyCategory(car,function(results){
		if(results!=null){
			res.json({cars:results});
		}else{
			res.json({cars:false});
		}
	});
});

module.exports = router;