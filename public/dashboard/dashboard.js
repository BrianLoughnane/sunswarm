$(document).on('ready', function() {
	// u_ --> utility API
	var projects = [
		{
			"latitude": "49.82211",
			"longitude": "57.79801"
		},
		{
			"latitude": "-38.62683",
			"longitude": "-110.81414"
		},
		{
			"latitude": "-54.93993",
			"longitude": "-9.53013"
		},
		{
			"latitude": "-85.56277",
			"longitude": "-103.324"
		},
		{
			"latitude": "12.33307",
			"longitude": "174.17176"
		},
		{
			"latitude": "88.36422",
			"longitude": "-103.47582"
		},
		{
			"latitude": "35.64511",
			"longitude": "-20.71583"
		},
		{
			"latitude": "-20.02112",
			"longitude": "-145.71387"
		},
		{
			"latitude": "-10.03469",
			"longitude": "147.42424"
		},
		{
			"latitude": "-60.63005",
			"longitude": "-178.46686"
		},
		{
			"latitude": "84.51557",
			"longitude": "-27.78924"
		},
		{
			"latitude": "-83.92498",
			"longitude": "-91.06722"
		},
		{
			"latitude": "-32.76624",
			"longitude": "-48.16637"
		},
		{
			"latitude": "78.85623",
			"longitude": "-146.78559"
		},
		{
			"latitude": "10.50987",
			"longitude": "-80.44977"
		},
		{
			"latitude": "-19.18598",
			"longitude": "78.77513"
		},
		{
			"latitude": "-6.28246",
			"longitude": "164.47124"
		},
		{
			"latitude": "37.27995",
			"longitude": "-151.46077"
		},
		{
			"latitude": "-16.13958",
			"longitude": "179.55704"
		},
		{
			"latitude": "-42.18184",
			"longitude": "176.85116"
		},
		{
			"latitude": "-85.8168",
			"longitude": "-122.08776"
		},
		{
			"latitude": "-42.25137",
			"longitude": "-2.17184"
		},
		{
			"latitude": "-39.49282",
			"longitude": "116.37956"
		},
		{
			"latitude": "74.59038",
			"longitude": "-124.94826"
		},
		{
			"latitude": "-54.48833",
			"longitude": "-53.97295"
		},
		{
			"latitude": "83.85497",
			"longitude": "-60.19575"
		},
		{
			"latitude": "-88.40241",
			"longitude": "160.32703"
		},
		{
			"latitude": "-29.03964",
			"longitude": "-68.77756"
		},
		{
			"latitude": "-5.19627",
			"longitude": "70.19188"
		},
		{
			"latitude": "77.27052",
			"longitude": "-10.92191"
		},
		{
			"latitude": "19.93881",
			"longitude": "67.75948"
		},
		{
			"latitude": "-7.41505",
			"longitude": "-162.22496"
		},
		{
			"latitude": "2.29729",
			"longitude": "7.10973"
		},
		{
			"latitude": "19.20878",
			"longitude": "94.38072"
		},
		{
			"latitude": "-51.37709",
			"longitude": "-23.15652"
		},
		{
			"latitude": "-51.11317",
			"longitude": "-109.40671"
		},
		{
			"latitude": "5.1582",
			"longitude": "11.35901"
		},
		{
			"latitude": "76.32488",
			"longitude": "152.12718"
		},
		{
			"latitude": "5.81127",
			"longitude": "-50.80663"
		},
		{
			"latitude": "86.05129",
			"longitude": "145.56407"
		},
		{
			"latitude": "19.79871",
			"longitude": "-57.39569"
		},
		{
			"latitude": "28.74809",
			"longitude": "151.94512"
		},
		{
			"latitude": "-71.70231",
			"longitude": "-80.2152"
		},
		{
			"latitude": "21.66581",
			"longitude": "-127.55431"
		},
		{
			"latitude": "17.56291",
			"longitude": "33.58493"
		},
		{
			"latitude": "-58.17275",
			"longitude": "-73.57017"
		},
		{
			"latitude": "50.55432",
			"longitude": "-154.4479"
		},
		{
			"latitude": "30.16821",
			"longitude": "70.15076"
		},
		{
			"latitude": "-49.90954",
			"longitude": "-86.80019"
		},
		{
			"latitude": "14.59775",
			"longitude": "-85.67299"
		},
		{
			"latitude": "25.87656",
			"longitude": "67.72602"
		},
		{
			"latitude": "-36.59376",
			"longitude": "142.21083"
		},
		{
			"latitude": "58.5992",
			"longitude": "-25.83042"
		},
		{
			"latitude": "-68.63034",
			"longitude": "81.07933"
		},
		{
			"latitude": "12.23437",
			"longitude": "-92.74342"
		},
		{
			"latitude": "69.90233",
			"longitude": "134.04651"
		},
		{
			"latitude": "-2.81664",
			"longitude": "13.66183"
		},
		{
			"latitude": "61.2636",
			"longitude": "-45.70851"
		},
		{
			"latitude": "-55.90951",
			"longitude": "-22.28774"
		},
		{
			"latitude": "81.20595",
			"longitude": "-129.97344"
		},
		{
			"latitude": "56.31898",
			"longitude": "147.58714"
		},
		{
			"latitude": "52.10255",
			"longitude": "126.2834"
		},
		{
			"latitude": "-83.2947",
			"longitude": "-110.39435"
		},
		{
			"latitude": "-81.54008",
			"longitude": "2.70583"
		},
		{
			"latitude": "81.53297",
			"longitude": "27.75264"
		},
		{
			"latitude": "86.23804",
			"longitude": "-78.50273"
		},
		{
			"latitude": "-12.96671",
			"longitude": "-33.49617"
		},
		{
			"latitude": "-29.05197",
			"longitude": "-66.72126"
		},
		{
			"latitude": "-68.46578",
			"longitude": "-73.37748"
		},
		{
			"latitude": "13.8326",
			"longitude": "-73.70145"
		},
		{
			"latitude": "-51.32621",
			"longitude": "64.2586"
		},
		{
			"latitude": "82.29372",
			"longitude": "-36.96749"
		},
		{
			"latitude": "18.33482",
			"longitude": "-124.50971"
		},
		{
			"latitude": "-28.93664",
			"longitude": "-126.91986"
		},
		{
			"latitude": "-14.26599",
			"longitude": "-72.04006"
		},
		{
			"latitude": "-41.56285",
			"longitude": "-70.38175"
		},
		{
			"latitude": "17.42785",
			"longitude": "129.58374"
		},
		{
			"latitude": "17.25866",
			"longitude": "-33.9334"
		},
		{
			"latitude": "69.00274",
			"longitude": "-147.51753"
		},
		{
			"latitude": "81.61645",
			"longitude": "44.48256"
		},
		{
			"latitude": "-12.28454",
			"longitude": "45.9245"
		},
		{
			"latitude": "9.59871",
			"longitude": "158.13661"
		},
		{
			"latitude": "31.16222",
			"longitude": "67.94525"
		},
		{
			"latitude": "30.72063",
			"longitude": "-141.17948"
		},
		{
			"latitude": "-86.55224",
			"longitude": "-150.83156"
		},
		{
			"latitude": "-29.88383",
			"longitude": "-24.23353"
		},
		{
			"latitude": "-62.19418",
			"longitude": "-56.94036"
		},
		{
			"latitude": "67.50401",
			"longitude": "-48.46645"
		},
		{
			"latitude": "-34.35491",
			"longitude": "109.93964"
		},
		{
			"latitude": "31.55317",
			"longitude": "171.68013"
		},
		{
			"latitude": "-29.24066",
			"longitude": "22.68831"
		},
		{
			"latitude": "66.65317",
			"longitude": "61.57144"
		},
		{
			"latitude": "33.25715",
			"longitude": "-1.66116"
		},
		{
			"latitude": "-43.46419",
			"longitude": "0.99965"
		},
		{
			"latitude": "-41.95199",
			"longitude": "154.49728"
		},
		{
			"latitude": "74.73829",
			"longitude": "93.95911"
		},
		{
			"latitude": "-67.70726",
			"longitude": "-110.56888"
		},
		{
			"latitude": "70.43826",
			"longitude": "129.16549"
		},
		{
			"latitude": "74.04606",
			"longitude": "-18.96987"
		},
		{
			"latitude": "55.17396",
			"longitude": "15.86867"
		},
		{
			'latitude': '37.81203',
			'longitude': '-122.25966'
		}
	];

	var info = {
		location: {
			county: undefined,
			address: undefined,
			city: undefined,
			state: undefined,
			zip: undefined,
			latitude: undefined,
			longitude: undefined
		},
		projectOptions: []
	};

	// SAMPLE PROJECT DATA - REMOVE LATER

	// projects = { 
	// 	name: 'project 1',
	// 	location: {
	// 		county: undefined,
	// 		address: undefined,
	// 		city: undefined,
	// 		state: undefined,
	// 		zip: undefined,
	// 		latitude: undefined,
	// 		longitude: undefined
	// 	},
	// 	price: {
	// 		perKWH: 0.01
	// 	}
	// }

	var geocoder;
	var map;

	function codeAddress(fullAddress) {
		return new Promise(function (resolve) {
			geocoder = new google.maps.Geocoder();
			// var address = fullAddress;
			var address = "149 Montecito Ave Oakland CA 94610";
			geocoder.geocode( { 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
			  	resolve({
			  		latitude : results[0].geometry.location.A,
			  		longitude : results[0].geometry.location.F,
			  		county : results[0].address_components[4].long_name	
			  	});
			  } else {
			    alert("Geocode was not successful for the following reason: " + status);
			  }
			});
		});
	}

	var harvestLocationData = function (locationData) {
		_.extend(info.location, locationData);
		return locationData;
	}

	var getDistance = function (lat1, lon1, lat2, lon2, unit) {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var radlon1 = Math.PI * lon1/180;
		var radlon2 = Math.PI * lon2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}


	var generateProjectOptions = function (locationData) {
		var lat = locationData.latitude;
		var longit = locationData.longitude;
		var county = locationData.county;
		var projectOptions = [];

		return new Promise(function (resolve) {
			_.each(projects, function (project, index) {
				var distance = getDistance(lat, longit, project.latitude, project.longitude);
				if (distance <= 10) {
				// var distance = distance(lat, longit, project.location.latitude, project.location.longitude);
				// if(county === project.location.county) || (distance <= 10)) {
					projectOptions.push(project);
				}
				if(index === projects.length-1) {
					info.projectOptions = projectOptions;
					resolve(projectOptions);
				}
			});
		});
	}

	var appendProjectOption = function (project) {
		// var node = $('<tr class="project-option"><td>'+project.name+'</td><td>'+project.savings+'</td></tr>');
		var node = $('<tr class="project-option"><td>latitude: '+project.latitude+'</td><td>longitude: '+project.longitude+'</td><td> sample cell </td><td> sample cell </td><td> sample cell </td></tr>');
		$('.project-list').append(node);
	}

	var displayOptions = function () {
		_.each(info.projectOptions, function (project) {
			appendProjectOption(project);
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
		return $.ajax('../getServicesUid/'+ info.u_user_uid);
	}

	var storeServicesUid = function(id) {
		info.u_service_uid = +id;
	}

	var activateAccount = function() {
		return $.ajax('../activate/'+info.u_service_uid);
	}


	// var pollEndpoint = function (uid, endpoint) {
	// 	
	// 	return function () {
	// 		
	// 		return $.ajax('../pollEndpoint/'+uid+'/'+endpoint);			
	// 	}
	// }

	var pollIntervalEndpoint = function () {
		return $.ajax('../pollIntervalEndpoint/'+ info.u_service_uid);
	}

	var harvestIntervalData = function (intervals) {
		// where intervals is the u_  /services/<services uid>/intervals endpoint for the newly created user
		// ** build up interval data object for genability here **
		var intervals = JSON.parse(intervals);
		info.u_utility_tariff_name = intervals[0].utility_tariff_name;
	}

	var pollBillingEndpoint = function () {
		return $.ajax('../pollBillingEndpoint/'+info.u_service_uid);
	}

	var harvestBillingData = function (bills) {
		
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
		var address = $('.input-address').val();
		var city = $('.input-city').val();
		var state = $('.input-state').val();
		var zip = $('.input-zip').val();
		var fullAddress = address + ' ' + city + ' ' + state + ' ' + zip;

		info.location.fullAddress = fullAddress;
		info.location.address = address;
		info.location.city = city;
		info.location.state = state;
		info.location.zip = zip;
		

		codeAddress(fullAddress)
			.then(harvestLocationData)
			.then(generateProjectOptions)
			.then(displayOptions);

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