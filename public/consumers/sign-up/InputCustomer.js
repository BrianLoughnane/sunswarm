$(document).on('ready', function() {

	$('#add-form').on('submit', function () {
		console.log('submitted');
	});

	debugger

	$('body').on('click', 'iframe', function() {
		debugger
		console.log('clicked');
	});

});