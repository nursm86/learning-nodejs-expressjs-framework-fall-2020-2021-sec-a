const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.clearCookie('uid');
	res.clearCookie('type');
	req.session.errmsg = null;
	res.redirect('/login');
});

module.exports = router;



