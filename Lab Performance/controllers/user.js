const express 					 = require('express');
const router 					 = express.Router();
const userModel 				 = require('../models/userModel');
const { body, validationResult } = require('express-validator');
const fs 						 = require("fs");
const multer 					 = require('multer');
const path 						 = require('path');

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

const storage = multer.diskStorage({
	destination: './assets/proImage',
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage: storage,
	limits: {filesize: 1000000},
	filefilter: function(req, file, cb){
		checkFileType(file, cb);
	}
}).single('file');

function checkFileType(file, cb){
	const filetypes = /jpeg|jpg|png|gif/;
	const extname = filetypes.test(path.extname(file.orginalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if(mimetype && extname){
		return cb(null, true);
	} else{
		cb('Error: Images Only!');
	}

}

router.get('/create', (req, res)=>{
	res.render('user/create');
});


router.post('/create',[body('name').isLength({min : 1}),body('username').isLength({min : 5}),body('password').isLength({min:6}),body('companyname').isLength({min : 2}),body('contactno').isLength({min:11})], (req, res)=>{
	
	const errors = validationResult(req);
  	if (!errors.isEmpty()) {
    	return res.status(400).json({errors: errors.array()});
  	}

	upload(req, res, (err)=>{
		if(err){
			console.log(err);
			res.render('emp_home', {
				msg: err
			});
		}else{
			if(req.file == undefined){
				res.render('emp_home', {
					msg: 'Error: No file Selected'
				});
			}else{
				var mg = encodeURIComponent('File uploaded!');
				    res.redirect('/emp_home?msg='+mg);
			}
		}
	});

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

