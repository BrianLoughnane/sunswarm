$(document).on('ready', function() {

	var info = {};

	var appendUtilityOptions = function (accountAddInfo) {
		var node;
		accountAddInfo.options.forEach(function (utility) {
			node = $('<option data-utility="' + utility.utility + '">' + utility.name + '</option>')
			$('.utility-options').append(node);
		});
	}

	var copyAccountInfo = function (account) {
		info.u_uid = account.uid;
		info.u_user_uid = account.user_uid;
		info.u_service_uid = account.service_uid;
	}

	var activateAccount = function() {
		return $.ajax('../activate/'+info.u_uid);
	}

	var pollBillingEndpoint = function () {
		return $.ajax('../pollBillingEndpoint/'+info.u_uid);
	}

	$.ajax('../createUtilityApiAccount')
		.then(appendUtilityOptions);

	
	$('.utility-options').on('change', function() {
		$('.utility-login').slideDown('fast');
	});

	$('.submit-utility-info').on('click', function () {
		// utilityAPI calls
		// var utilityCode = $('.utility-options option:selected').data('utility');
		var utilityCode = "DEMO";
		info.utility = $('.utility-options').val();
		info.utility_username = $('.utility-username').val();
		info.utility_password = $('.utility-password').val();
		info.signature = $('.utility-signature').val();

		var submitEndpoint = '../submitUtilityApiInfo/'+utilityCode+'/'+info.signature+'/'+info.utility_username+'/'+info.utility_password;
		Q($.ajax(submitEndpoint))	
			.then(copyAccountInfo)
			.then(activateAccount)
			.then(pollBillingEndpoint)
			.then(function () {
				debugger
			})
	});
	
	$('.submit-name').on('click', function() {
		info.name = $('.input-name').val();
		
		$('.enter-name').hide();
		$('.enter-address').show();
	});

	$('.submit-address').on('click', function() {
		info.address = $('.input-address').val();
		info.city = $('.input-city').val();
		info.state = $('.input-state').val();
		info.zip = $('.input-zip').val();
		
		$('.enter-address').hide();
		$('.utility-api-signup').show();
	});
});