const db = require('./db');

module.exports= {
	insert: function(blog, callback){
        var sql = "INSERT INTO blogs(Title, user_id, Description, updatedDate) VALUES ('"+blog.title+"','"+blog.u_id+"','"+blog.description+"','"+blog.date+"')";
		db.execute(sql,function(status){
			callback(status);
		});
	},
	getAll : function(callback){
		var sql = "SELECT u.name as name,b.Title as title,b.Description as description,b.id as bid,u.id as uid,b.updatedDate as ud FROM blogs as b, users as u WHERE u.id = b.user_id";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	delete : function(id,callback){
		var sql = "DELETE FROM blogs WHERE id = '"+id+"'";
		db.execute(sql,function(status){
			callback(status);
		});
	}
};