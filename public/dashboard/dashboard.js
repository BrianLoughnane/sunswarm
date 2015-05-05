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
		info.u_account_uid = account.uid;
		info.u_user_uid = account.user_uid;
		info.u_service_uid = account.service_uid;
		
	}

	var wait = function () {
		var p = new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve(true);
			}, 5000);
		})
		return p;
	}

	var getServicesUid = function() {
		var userId = info.u_user_uid;

		return $.ajax('../getServices')
			.then(function (services) {

				for(var i = 0; i < services.length; i++) {
					if(services[i].user_uid === userId) {
						info.u_service_uid = services[i].uid;
						return;
					}
				}					

			});
	}

	var activateAccount = function() {
		return $.ajax('../activate/'+info.u_service_uid);
	}

	var pollBillingEndpoint = function () {
		return $.ajax('../pollBillingEndpoint/'+info.u_account_uid);
	}

	var harvestBillingData = function (bills) {
		bills = bills.split("$").join("");  //parse cannot handle $
		utilBills = JSON.parse(bills);


		debugger
		var Bill = Parse.Object.extend("Bill");
		var billsToSave = [];

		_.each(utilBills, function(utilBill) {
			var bill = new Bill();
			for(key in utilBill) {	//save all key/value from utilityAPI to Parse
				bill.set(key, utilBill[key]);
			}
			billsToSave.push(bill);
			bill.set("customer", Parse.User.current());
		});

		// save all the newly created objects
	    Parse.Object.saveAll(billsToSave, {
	        success: function(objs) {
	            // objects have been saved...
	            alert("successly loaded bills into parse");
	        },
	        error: function(error) { 
	            // an error occurred...
	            alert("failure" + error.message);
	        }
	    });

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
			.then(wait)
			.then(getServicesUid)
			.then(activateAccount)
			.then(pollBillingEndpoint)
			.then(harvestBillingData)
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