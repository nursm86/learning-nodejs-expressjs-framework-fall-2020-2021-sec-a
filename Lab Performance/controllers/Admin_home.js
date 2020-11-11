const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	res.render('Admin_home/index', {name: 'alamin', id:'123'});
});


router.get('/userlist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('Admin_home/userlist', {users: results});
	});

});

router.post('/search',(req,res)=>{
	var user = {
		username : req.body.username
	};
	userModel.search(user, function(results){
		if(results){
			res.json({user:results});
		}else{
			res.json({user:'error'});
		}
	});
});

module.exports = router;