$(document).ready(function(){
	$('#username').focus(function(){
		var erruname = $("#err_uname").val();
		if(erruname!=null){
			$('#err_uname').html("");
		}
	});
	$('#username').focusout(function(){
		var uname = $("#username").val();
		$.ajax({
			url: '/user/get',
			method: 'post',
			datatype : 'json',
			data : {'field':'username',
					'val': uname},
			success:function(response){
				if(response.flag){
					$('#err_uname').html("User Name is Already Taken Plz select another one!!!");
				}
			},
			error:function(response){
				
			}
		});
	});


	$('#contact').focus(function(){
		var erruname = $("#err_contact").val();
		if(erruname!=null){
			$('#err_contact').html("");
		}
	});
	$('#contact').focusout(function(){
		var contact = $("#contact").val();
		$.ajax({
			url: '/user/get',
			method: 'post',
			datatype : 'json',
			data : {'field':'contactno',
					'val': contact},
			success:function(response){
				if(response.flag){
					$('#err_contact').html("Contact No is Already User by other Plz select another one!!!");
				}
			},
			error:function(response){
				
			}
		});
	});
});