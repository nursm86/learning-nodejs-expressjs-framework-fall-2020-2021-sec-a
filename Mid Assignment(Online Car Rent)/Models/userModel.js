const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO users(name,username, password,address,contactno, type) VALUES ('"+user.name+"','"+user.username+"','"+user.password+"','"+user.address+"','"+user.contactno+"','"+user.type+"')";
		db.execute(sql,function(status){
			callback(status);
		});
	},
	getById: function(id, callback){
		var sql = "select * from users where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	update:function(user, callback){
		var sql = "UPDATE users SET name='"+user.name+"',address='"+user.address+"',contactno='"+user.contactno+"',password='"+user.password+"' WHERE id = '"+user.id+"'";
		db.execute(sql,function(status){
			callback(status);
		});
	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM users WHERE id = '"+id+"'";
		db.execute(sql,function(status){
			callback(status);
		});
	},
	getUserName : function(user,callback){
		var sql = "select * from users where "+user.field+"='"+user.value+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	}
};