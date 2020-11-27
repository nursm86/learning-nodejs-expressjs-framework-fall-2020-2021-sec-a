const db = require('./db');

module.exports= {
	insert: function(rent, callback){
        var sql = "INSERT INTO rents(car_id, user_id, rentingDate, p_method, total_price) VALUES ('"+rent.c_id+"','"+rent.user_id+"','"+rent.date+"','"+rent.p_method+"','"+rent.total_price+"')";
		db.execute(sql,function(status){
			callback(status);
		});
	},
	getById : function(id, callback){
		var sql = "SELECT c.name as carName, r.p_method as method, r.total_price as tp, r.rentingDate as rd FROM rents as r, cars as c WHERE r.car_id = c.id and user_id = '"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getCount : function(callback){
		var sql = "SELECT COUNT(*) as total FROM rents";
		db.getResults(sql, function(results){
			callback(results[0]);
		});
	},
	getRecent : function(callback){
		var sql = "SELECT u.name as name,u.contactno as contact, c.name as carName, r.p_method as method, r.total_price as tp, r.rentingDate as rd FROM rents as r, cars as c, users as u WHERE r.car_id = c.id and r.user_id = u.id ORDER BY r.rentingDate DESC LIMIT 10";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll : function(callback){
		var sql = "SELECT u.name as name,u.contactno as contact, c.name as carName, r.p_method as method, r.total_price as tp, r.rentingDate as rd FROM rents as r, cars as c, users as u WHERE r.car_id = c.id and r.user_id = u.id";
		db.getResults(sql, function(results){
			callback(results);
		});
	}
};