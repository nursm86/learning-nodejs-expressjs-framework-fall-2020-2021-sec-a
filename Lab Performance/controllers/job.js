const express 	= require('express');
const jobModel = require('../models/jobModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/create', (req, res)=>{
	res.render('job/create');
});

router.post('/create', (req, res)=>{
	
	var job = {
		companyname: req.body.companyname,
		joblocation: req.body.joblocation,
		title:req.body.title,
		salary: req.body.salary
	};
	
	jobModel.insert(job,function(status){
		if(status){
			res.redirect('/Employee_home/joblist');
		}else{
			res.render('job/create');
		}
	});
});

router.get('/edit/:id', (req, res)=>{
	
	jobModel.getById(req.params.id,function(result){
		var job = {
			companyname: result.companyname,
			joblocation: result.joblocation,
			title: result.jobtitle,
			salary: result.salary
		};
			res.render('job/edit', job);
	});
});

router.post('/edit/:id', (req, res)=>{
	var job = {
		id : req.params.id,
		companyname: req.body.companyname,
		joblocation: req.body.joblocation,
		title:req.body.title,
		salary: req.body.salary
	};
	jobModel.update(job,function(status){
		if(status){
			res.redirect('/Employee_home/joblist');
		}
		else{
			res.render('job/edit', job);
		}
	});
});

router.get('/delete/:id', (req, res)=>{
	jobModel.getById(req.params.id,function(result){
		var job = {
			companyname: req.body.companyname,
			joblocation: req.body.joblocation,
			title:req.body.title,
			salary: req.body.salary
		};
		res.render('job/delete', job);
	});
});

router.post('/delete/:id', (req, res)=>{
	jobModel.delete(req.params.id,function(status){
		if(status){
			res.redirect('/Admin_home/joblist');
		}
	});
});

module.exports = router;

