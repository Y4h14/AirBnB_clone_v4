$(document).ready(function () {
  // task2 - 1-hbnb
  const amenities = {};
  $('.amenities input:checkbox').each(function () {
    $(this).on('change', function (event) {
      if ($(this).is(':checked')) {
        amenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenities[$(this).data('id')];
      }
      const amenitiesList = Object.values(amenities).join(', ');
      $('div.amenities h4').text(amenitiesList);
    });
  });

  // task3 - 2-hbnb
  $.get('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // task4 - 3-hbnb
  function renderPlace (place) {
    let html = `
    <article>
    <div class="title_box">
      <h2>${place.name}</h2>
      <div class="price_by_night">$${place.price_by_night}</div>
    </div>
    <div class="information">
      <div class="max_guest">${place.max_guest}  Guest${
      place.max_guest !== 1 ? 's' : ''
      }</div>
      <div class="number_rooms">${place.number_rooms} Bedroom${
        place.number_rooms !== 1 ? 's' : ''
        }</div>
      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
        place.number_bathrooms !== 1 ? 's' : ''
      }</div>
      </div>
      <div class="description">
      ${place.description}
      </div>
      <div class="reviews">
        <h2>Reviews <span>show</span></h2>
	<ul>`;
      console.log(place.reviews);
      place.reviews.forEach(review => {
	      html += `<li>${review.text}</li>`;
      });
      html += `
        </ul>
      </div>
      </article>`;
      return html;
  }

  function renderPlaces (places) {
    return places.map(place => renderPlace(place)).join('');
  }

  $.post({
    url: 'http://localhost:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    headers: { 'content-type': 'application/json' },
    dataType: 'json'
  }, function (data) {
    $('section.places').append(renderPlaces(data));
  }
  );
  // task5 - 4-hbnb
  $('.filters button').click(function () {
    const amenitiesList = Object.keys(amenities);
    console.log(amenitiesList);
    $.post({
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: amenitiesList }),
      headers: { 'content-type': 'application/json' },
      dataType: 'json'
    }, function (data) {
      console.log(data);
      $('section.places').html(renderPlaces(data));
    });
  });
  // task100 - 100-hbnb
  const states = {};
  $('.locations input:checkbox').each(function () {
    $(this).on('change', function (event) {
      if ($(this).is(':checked')) {
        states[$(this).data('id')] = $(this).data('name');
      }
      else {
        delete states[$(this).data('id')];
      }
      const statesList = Object.values(states).join(', ');
      $('div.locations h4').text(statesList);
    });
  });

  const cities = {};
  $('.locations input:checkbox').each(function () {
    $(this).on('change', function (event) {
      if ($(this).is(':checked')) {
        cities[$(this).data('id')] = $(this).data('name');
      }
      else {
        delete cities[$(this).data('id')];
      }
      const citiesList = Object.values(cities).join(', ');
      $('div.locations h4').text(citiesList);
    });
  });

  $('.filters button').click(function() {
    const amenitiesList = Object.keys(amenities);
    const statesList = Object.keys(states);
    const citiesList = Object.keys(cities);
    $.post({
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: amenitiesList, states: statesList, cities: citiesList }),
      headers: { 'content-type': 'application/json' },
      dataType: 'json'
    }, function (data) {
      console.log(data);
      $('section.places').html(renderPlaces(data));
    });
  });
  
  //task7 - 101-hbnb
  $('.reviews span').click(function() {
    if ($('.reviews span').text() == 'show'){
	    $('.reviews ul').css('display', 'block');
	    $('.reviews span').html('hide');
    }
    else {
	    $('.reviews ul').css('display', 'none');
	    $('.reviews span').html('show');
    }
  });
});

