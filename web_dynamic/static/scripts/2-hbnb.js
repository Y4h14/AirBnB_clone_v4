$(document).ready(function() {

	// task2 - 1-hbnb
	let amenities = {}
	$("input:checkbox").each(function(){
		$(this).on("change", function(event){
			if ($(this).is(':checked')){
				amenities[$(this).data('id')] = $(this).data('name');
			}
			else {
				delete amenities[$(this).data('id')];
			}
			let amenitiesList = Object.values(amenities).join(', ');
			$("div.amenities h4").text(amenitiesList);
		});
	});

	// task3 - 2-hbnb
	$.get('http://localhost:5001/api/v1/status/', function (data) {
		if (data.status === 'OK') {
			$('#api_status').addClass('available')
		}
		else {
			$('#api_status').removeClass('available')
		}
	});
});
