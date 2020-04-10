$(document).ready(function() {
	console.log('JavaScipt is working');

	//on click function
	$('form').submit(function(event) {
		event.preventDefault();
		console.log('click');
	});
});
