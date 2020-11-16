const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const carModel  = require.main.require('./models/carModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uid'] == null && req.cookies['type'] !=0){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	res.render('Admin/index');
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
		res.render('admin/profile', user);
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
		res.render('admin/edit', user);
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
			res.redirect('/admin/profile');
		}
		else{
			res.render('Admin/edit', user);
		}
	});
});

router.get('/addnewadmin', (req, res)=>{
	res.render('admin/addnewadmin');
});

router.post('/addnewadmin',(req,res)=>{
	var user = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		address: req.body.address,
		contactno: req.body.contactno,
		type: 0
	};
	userModel.insert(user,function(status){
		if(status){
			res.redirect('/admin/allusers');
		}else{
			res.render('/admin/addnewadmin',user);
		}
	});
});

router.get('/allusers',(req,res)=>{
	userModel.getAll(function(results){
		res.render('admin/allusers', {users: results});
	});
});

router.get('/deleteuser/:id', (req, res)=>{
	userModel.getById(req.params.id,function(result){
		var user = {
			name: result.name,
			username: result.username,
			password: result.password,
			address: result.address,
			contactno: result.contactno
		};
		res.render('admin/deleteuser', user);
	});
});

router.post('/deleteuser/:id', (req, res)=>{
	userModel.delete(req.params.id,function(status){
		if(status){
			res.redirect('/admin/allusers');
		}
	});
});

router.get('/allcars',(req,res)=>{
	carModel.getAll(function(results){
		res.render('admin/allcars', {cars: results});
	});
});

router.get('/addnewcar',(req,res)=>{
	res.render('admin/addnewcar');
});

router.post('/addnewcar',(req,res)=>{
	var car = {
		name: req.body.name,
		rentprice: req.body.rentprice,
		description: req.body.description,
		type: req.body.type,
		image: req.body.image
	};
	carModel.insert(car,function(status){
		if(status){
			res.redirect('/admin/allcars');
		}else{
			res.render('/admin/addnewcar',car);
		}
	});
});
module.exports = router;