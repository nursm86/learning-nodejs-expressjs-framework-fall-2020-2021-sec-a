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
	insert: function(job, callback){
		var sql = "INSERT INTO job(companyname,joblocation, jobtitle,salary) VALUES ('"+job.companyname+"','"+job.joblocation+"','"+job.title+"','"+job.salary+"')";
		//console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	update:function(job, callback){
		var sql = "UPDATE job SET companyname='"+job.companyname+"',joblocation='"+job.joblocation+"',jobtitle='"+job.title+"',salary='"+job.salary+"' WHERE id = '"+job.id+"'";
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