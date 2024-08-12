//Hook up the tweet display

$(document).ready(function() {
						   
	$(".countdown").countdown({
				date: "15 aug 2024 14:30:00",
				format: "on"
			},
			
			function() {
				// callback function
			});

});	
