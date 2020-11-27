$(document).ready(function(){
	$('#category').change(function(){
        var see = $('#category').val();
        var availability = $('#availability').val();
		$.ajax({
			url: '/admin/getCar',
			method: 'post',
			datatype : 'json',
            data : {'see' : see,
                    'availability' : availability},
			success:function(response){
				var tbody = "";
				response.cars.forEach(element => {
					tbody += '<tr>';
                    tbody += '<td>'+element.id+'</td>';
                    tbody += '<td>'+element.name+'</td>';
                    tbody += '<td>'+element.rentprice+'</td>';
                    tbody += '<td>'+element.description+'</td>';
                    tbody += '<td><img class="card-image" src="'+element.image+'"></img></td>';
                    tbody += '<td>'+element.type+'</td>';
                    if(element.availability == 0){
                        tbody += '<td>Available</td>';
                    }else if(element.availability == 1){
                        tbody += '<td>Busy</td>';
                    }else{
                        tbody += '<td>Damaged</td>';
                    }
                    tbody += '<td><a href="/admin/editcar/'+element.id+'" class="btn btn-danger">view</a></td>';
                    tbody += '</tr>';
				});
				$('#tbody').html(tbody);
			},
			error:function(response){
				
			}
		});
    });
    
    $('#availability').change(function(){
        var see = $('#category').val();
        var availability = $('#availability').val();
		$.ajax({
			url: '/admin/getCar',
			method: 'post',
			datatype : 'json',
            data : {'see' : see,
                    'availability' : availability},
			success:function(response){
				var tbody = "";
				response.cars.forEach(element => {
					tbody += '<tr>';
                    tbody += '<td>'+element.id+'</td>';
                    tbody += '<td>'+element.name+'</td>';
                    tbody += '<td>'+element.rentprice+'</td>';
                    tbody += '<td>'+element.description+'</td>';
                    tbody += '<td><img class="card-image" src="'+element.image+'"></img></td>';
                    tbody += '<td>'+element.type+'</td>';
                    if(element.availability == 0){
                        tbody += '<td>Available</td>';
                    }else if(element.availability == 1){
                        tbody += '<td>Busy</td>';
                    }else{
                        tbody += '<td>Damaged</td>';
                    }
                    tbody += '<td><a href="/admin/editcar/'+element.id+'" class="btn btn-danger">view</a></td>';
                    tbody += '</tr>';
				});
				$('#tbody').html(tbody);
			},
			error:function(response){
				
			}
		});
    });
    
    $('#users').change(function(){
        var see = $('#users').val();
		$.ajax({
			url: '/admin/getUser',
			method: 'post',
			datatype : 'json',
            data : {'see' : see},
			success:function(response){
				var tbody = "";
				response.users.forEach(element => {
					tbody += '<tr>';
                    tbody += '<td>'+element.id+'</td>';
                    tbody += '<td>'+element.name+'</td>';
                    tbody += '<td>'+element.username+'</td>';
                    tbody += '<td>'+element.contactno+'</td>';
                    tbody += '<td>'+element.address+'</td>';
                    if(element.type == 0){
                        tbody += '<td>Admin</td>';
                    }else if(element.type == 1){
                        tbody += '<td>User</td>';
                        tbody += '<td><a href="/admin/deleteuser/<%= std.id %>" class="btn btn-danger">Delete</a></td>';
                    }
                    tbody += '</tr>';
				});
				$('#tbody').html(tbody);
			},
			error:function(response){
				
			}
		});
	});
});