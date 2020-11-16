const db = require('./db');

module.exports= {
	insert: function(car, callback){
		var sql = "INSERT INTO cars(name,carname, password,address,contactno, type) VALUES ('"+car.name+"','"+car.carname+"','"+car.password+"','"+car.address+"','"+car.contactno+"','"+car.type+"')";
		db.execute(sql,function(status){
			callback(status);
		});
	},
	getById: function(id, callback){
		var sql = "select * from cars where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	update:function(car, callback){
		//var sql = "UPDATE cars SET name='"+car.name+"',address='"+car.address+"',contactno='"+car.contactno+"',password='"+car.password+"' WHERE id = '"+car.id+"'";
		db.execute(sql,function(status){
			callback(status);
		});
	},
	getAll: function(callback){
		var sql = "select * from cars";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM cars WHERE id = '"+id+"'";
		db.execute(sql,function(status){
			callback(status);
		});
	}
};