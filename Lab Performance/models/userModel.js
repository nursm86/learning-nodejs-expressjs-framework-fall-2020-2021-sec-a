const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0].type);
			}
		});
	},
	getById: function(id, callback){

	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO users(name,username, password,companyname,contactno, type) VALUES ('"+user.name+"','"+user.username+"','"+user.password+"','"+user.companyname+"','"+user.contactno+"','"+user.type+"')";
		//console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	update:function(user, callback){

	},
	delete: function(id, callback){

	}
}