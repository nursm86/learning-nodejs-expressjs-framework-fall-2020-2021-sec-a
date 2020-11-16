const express 	= require('express');
const userModel = require.main.require('./models/userModel');
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
		id:req.body.username,
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

module.exports = router;