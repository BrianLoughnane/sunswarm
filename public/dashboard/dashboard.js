$(document).on('ready', function() {
	// u_ --> utility API

	var info = {
		location: {
			geo: undefined,
			county: undefined,
			address: undefined,
			city: undefined,
			state: undefined,
			zip: undefined
		},
		projectOptions: []
	};

	// SAMPLE PROJECT DATA - REMOVE LATER

	projects = { 
		name: 'project 1',
		location: {
			geo: undefined,
			county: undefined,
			address: undefined
		},
		price: {
			perKWH: 0.01
		}

	}

	var generateProjectOptions = function () {
		_.each(projects, function (project) {
			// if( info.location.geo is within 10 miles of project.location.geo or info.location.county === project.location.county ) {
			if (true) {
				info.projectOptions.push(project);
			}
		});
	}

	var appendProjectOption = function (project) {
		var node = $('<tr class="project-option"><td>'+project.name+'</td><td>'+project.savings+'</td></tr>');
		$('.project-list').append(node);
	}

	var displayOptions = function () {
		_.each(info.options, function (option) {
			appendProjectOption(option);
		});
	}

	var appendUtilityOptions = function (accountAddInfo) {
		var node;
		accountAddInfo.options.forEach(function (utility) {
			node = $('<option data-utility="' + utility.utility + '">' + utility.name + '</option>')
			$('.utility-options').append(node);
		});
	}

	var harvestAccountInfo = function (account) {
		debugger
		// where account is the u_ account endpoint for the newly created user
		info.u_account_uid = account.uid;
		info.u_user_uid = account.user_uid;		
	}

	var wait = function () {
		// WAIT
		// This is for demo purposes and can be removed for production
		// getServicesUid polls the services endpoint and maps the user's u_service_uid based on their u_user_id
		// Seeing as the demo accounts are all assigned the same user uid, the wait is inserted to ensure the latest account is accessed (not the previous which has the same user uid) 
		var p = new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve(true);
			}, 5000);
		})
		return p;
	}

	var getServicesUid = function () {
		debugger
		return $.ajax('../getServicesUid/'+ info.u_user_uid);
	}

	var storeServicesUid = function(id) {
		debugger
		info.u_service_uid = +id;
	}

	var activateAccount = function() {
		debugger
		return $.ajax('../activate/'+info.u_service_uid);
	}


	// var pollEndpoint = function (uid, endpoint) {
	// 	debugger
	// 	return function () {
	// 		debugger
	// 		return $.ajax('../pollEndpoint/'+uid+'/'+endpoint);			
	// 	}
	// }

	var pollIntervalEndpoint = function () {
		debugger
		return $.ajax('../pollIntervalEndpoint/'+ info.u_service_uid);
	}

	var harvestIntervalData = function (intervals) {
		// where intervals is the u_  /services/<services uid>/intervals endpoint for the newly created user
		// ** build up interval data object for genability here **
		var intervals = JSON.parse(intervals);
		info.u_utility_tariff_name = intervals[0].utility_tariff_name;

		debugger
	}

	var pollBillingEndpoint = function () {
		return $.ajax('../pollBillingEndpoint/'+info.u_service_uid);
	}

	var harvestBillingData = function (bills) {
		debugger
		// where bills is the u_  /services/<services uid>/bills endpoint for the newly created user

		bills = bills.split("$").join("");  //parse cannot handle $
		utilBills = JSON.parse(bills);

		var Bill = Parse.Object.extend("Bill");
		var billsToSave = [];

		_.each(utilBills, function(utilBill) {
			var bill = new Bill();
			for(var key in utilBill) {	//save all key/value from utilityAPI to Parse
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

	// User Flow and Event Triggering Functionality:
	
	$('.submit-name').on('click', function() {
		info.name = $('.input-name').val();
		
		$('.enter-name').hide();
		$('.enter-address').show();
	});

	$('.submit-address').on('click', function() {
		info.location.address = $('.input-address').val();
		info.location.city = $('.input-city').val();
		info.location.state = $('.input-state').val();
		info.location.zip = $('.input-zip').val();
		
		// USE GEOLOCATION LIBRARY TO GENERATE THIS DATA FROM ADDRESS

		info.location.geo = undefined;
		info.location.county = undefined;

		// ----------------------------------------------

		generateProjectOptions();

		$('.enter-address').hide();
		$('.utility-api-signup').show();

		//save to parse
		var Address = Parse.Object.extend("Address");
		var address = new Address();

		address.set("address", info.location.address);
		address.set("city", info.location.city);
		address.set("state", info.location.state);
		address.set("zip", info.location.zip);
		address.set("customer", Parse.User.current());

		address.save(null, {
	        success: function(customer) {
	        	alert("Address Saved");
	        },
	        error: function(customer, error) {
	          	alert("Address not saved");
	        }
	    });
	});

	$.ajax('../createUtilityApiAccount')
		.then(appendUtilityOptions);

	
	$('.utility-options').on('change', function() {
		$('.utility-login').slideDown('fast');
	});

	$('.submit-utility-info').on('click', function () {
		// utilityAPI calls

		var utilityCode = $('.utility-options option:selected').data('utility');
		// var utilityCode = "DEMO";
		info.utility = $('.utility-options').val();
		info.utility_username = $('.utility-username').val();
		info.utility_password = $('.utility-password').val();
		info.signature = $('.utility-signature').val();

		var submitEndpoint = '../submitUtilityApiInfo/'+utilityCode+'/'+info.signature+'/'+info.utility_username+'/'+info.utility_password;
		Q($.ajax(submitEndpoint))	
			.then(harvestAccountInfo)
			.then(wait)
			.then(getServicesUid)
			.then(storeServicesUid)
			.then(activateAccount)
			.then(wait)
			.then(pollIntervalEndpoint)
			.then(harvestIntervalData)
			.then(pollBillingEndpoint)
			.then(harvestBillingData)
			.then(displayOptions)
	});


}); // END ON READY