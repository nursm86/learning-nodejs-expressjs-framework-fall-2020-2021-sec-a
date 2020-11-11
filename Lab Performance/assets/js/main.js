$(document).ready(function(){
	$('#search').on('keyup',function(){
		var search = $("#search").val();
		var searchby = $("#searchby").val();

		$.ajax({
			url: '/Admin_home/search',
			method: 'post',
			datatype : 'json',
			data : {'search':search,
					'searchby':searchby},
			success:function(response){
				if(response.user !== 'error'){
					var tableBody="<tr><td>ID</td><td>Name</td><td>User Name</td><td>Company Name</td><td>Contact No</td><td>Type</td><td>Action</td></tr>";
					response.user.forEach(element => {
						var tableRow="";
						tableRow+="<td>"+element.id+"</td>";
						tableRow+="<td>"+element.name+"</td>";
						tableRow+="<td>"+element.username+"</td>";
						tableRow+="<td>"+element.companyname+"</td>";
						tableRow+="<td>"+element.contactno+"</td>";
						if(element.type == 0){
							tableRow+="<td>Admin</td>";
						}
						else{
							tableRow+="<td>Employee</td>";
						}
						tableRow += "<td><a href='/user/edit/"+element.id+"'>Edit</a> | <a href='/user/delete/"+element.id+"'>Delete</a></td>";
						tableBody=tableBody+"<tr>"+tableRow+"</tr>";
					});
					$('#table').html(tableBody);
				}else{

				}
			},
			error:function(response){
				alert('server error');
			}
		});
	});
});