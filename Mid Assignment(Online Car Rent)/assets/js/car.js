$(document).ready(function(){
	$('#category').change(function(){
		var see = $('#category').val();
		$.ajax({
			url: '/user/getCarbyCategory',
			method: 'post',
			datatype : 'json',
			data : {'see' : see},
			success:function(response){
				var div = "";
				response.cars.forEach(element => {
					div += '<div class="card-product col-md-4">';
                    div += '<img class="card-image" src="'+element.image+'"></img>';
                    div += '<b class="text">'+element.name+'</b>';
                    div += '<div class="price-label"><span ><b>'+element.rentprice+'(Per Hour)</b></span></div>'
					div += '<a href="/user/carinfo/'+element.id+'"><div class="add-to-cart"><class class="btn btn-success" style="width:185px;font-family:consolas;margin-top:5px;">Rent the Car</class></span></div></a>';
					div += "</div>";
				});
				$('#cars').html(div);
			},
			error:function(response){
				
			}
		});
	});
});