$(document).ready(function() {
	$.get('http://localhost:5001/api/v1/status/', function (data) {
		if (data.status === 'OK') {
			$('#api_status').addClass('available')
		}
		else {
			$('#api_status').removeClass('available')
		}
	});
});
