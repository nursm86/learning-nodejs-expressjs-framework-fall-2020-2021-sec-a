const db = require('./db');

module.exports= {
	insert: function(car, callback){
		var sql = "INSERT INTO cars(name,rentprice, description,type,image) VALUES ('"+car.name+"','"+car.rentprice+"','"+car.description+"','"+car.type+"','"+car.image+"')";
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
		var sql = "UPDATE cars SET name='"+car.name+"',description='"+car.description+"',type='"+car.type+"',rentprice='"+car.rentprice+"',image='"+car.image+"' WHERE id = '"+car.id+"'";
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