const db = require('./db');

module.exports= {
	getById: function(id, callback){
		var sql = "select * from job where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from job";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO job(name,username, password,companyname,contactno, type) VALUES ('"+user.name+"','"+user.username+"','"+user.password+"','"+user.companyname+"','"+user.contactno+"','"+user.type+"')";
		//console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	update:function(user, callback){
		var sql = "UPDATE job SET name='"+user.name+"',companyname='"+user.companyname+"',contactno='"+user.contactno+"',username='"+user.username+"',password='"+user.password+"',type='"+user.type+"' WHERE id = '"+user.id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM job WHERE id = '"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	}
}