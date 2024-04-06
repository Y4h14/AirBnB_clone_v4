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

	//task4 - 3-hbnb
	function renderPlace(place){
		return `<article>
		<div class="title_box">
		  <h2>${ place.name }</h2>
		  <div class="price_by_night">${place.price_by_night}</div>
		</div>
		<div class="information">
		  <div class="max_guest">${ place.max_guest }  Guest${
			place.max_guest !== 1 ? "s": ""
		}</div>
			  <div class="number_rooms">${ place.number_rooms } Bedroom${
				place.number_rooms !== 1 ? "s": ""
			}</div>
			  <div class="number_bathrooms">${ place.number_bathrooms } Bathroom${
				place.number_bathrooms !== 1 ? "s" : ""
			}</div>
		</div>
			<div class="description">
		  ${place.description}
			</div>
	  </article>`;
	}
	
	function renderPlaces(places){
		return places.map(place=> renderPlace(place)).join('');
	}
	
	$.post({
		url: "http://localhost:5001/api/v1/places_search/",
		data: JSON.stringify({}),
		headers: { "content-type": "application/json"}
	}, function (data) {
		$("section.places").append(renderPlaces(data));
	},
	 dataType="json"
	);

	// task5 - 4-hbnb
	$('.filters button').click(function () { 
		const amenitiesList = Object.keys(amenities);
		console.log(amenitiesList)
		$.post({
			url: "http://localhost:5001/api/v1/places_search/",
			data: JSON.stringify({"amenities": amenitiesList}),
			headers: { "content-type": "application/json"}
		}, function (data) {
			console.log(data)
			$("section.places").append(renderPlaces(data));
		}
		),
		 dataType="json";
		
	});
});
