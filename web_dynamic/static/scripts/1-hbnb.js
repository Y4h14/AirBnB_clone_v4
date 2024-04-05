$(document).ready(function() {
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
});
