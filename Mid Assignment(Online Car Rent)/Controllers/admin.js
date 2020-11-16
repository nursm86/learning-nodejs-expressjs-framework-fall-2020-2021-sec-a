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

module.exports = router;