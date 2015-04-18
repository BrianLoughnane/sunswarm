$(document).on('ready', function() {
	// Build URL of User Id's

// 	$.ajax('https://utilityapi.com/api/services.json?access_token=hackathontoken')
// 		.done(function (meterData) {
// 			var ids = [];

// 			_.pluck(meterData, function ())
// 		});

// // rate and energy usage
// output : savings
	$.ajax('https://utilityapi.com/api/services/5285/bills.json?access_token=hackathontoken')
	
		.done(function (data) {
			
			var serviceUid = data[0].service_uid;
			var address = data[0].utility_service_address;
			var totalCost = 0;
			var numberOfMonths = 0;
			var totalKwh = 0;

			_.each(data, function (monthlyStatement) {
				numberOfMonths++;
				totalKwh += monthlyStatement.bill_total_kWh;
				var lineItems = monthlyStatement.bill_breakdown.line_items;
				_.each(lineItems, function (item) {
					totalCost += item.cost;
				})
			});

			var averageMonthlyCost = totalCost/numberOfMonths;
			var averageMonthlyKwh = totalKwh/numberOfMonths;

			var annualKwh = 0;
			var annualCost = 0;

			if (numberOfMonths < 12) {
				annualCost = averageMonthlyCost * 12;
				annualKwh = averageMonthlyKwh * 12;
			} else {
				for(var i = 0; i < 12; i++) {
					annualKwh += data[i].bill_total_kWh;
					annualCost += data[i].bill_total;
				}
			}

			// debugger;
		})
});

