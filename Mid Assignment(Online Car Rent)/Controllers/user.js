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

module.exports = router;