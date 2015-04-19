$(document).on('ready', function() {
	// Build URL of User Id's

	// function getCustomerDataFor(id) {
	// 	// var promise = new Promise(function(resolve) {
	// 	// 	resolve({
	// 	// 		name: name,
	// 	// 		address: address,
	// 	// 		utility: utility,
	// 	// 		rate: rate,
	// 	// 		annualKwh: annualKwh
	// 	// 	});
	// 	// });

		var name;
		var address;
		var utility;
		var rate;
		var annualKwh;

	// 	$.ajax('https://utilityapi.com/api/services/'+id+'/bills.json?access_token=hackathontoken')
	// 		.done(function (bill) {
				
	// 			name = bill[0].utility_billing_contact;
	// 			address = bill[0].utility_service_address;
	// 			utility = bill[0].utility;
	// 			rate = bill[0].utility_tariff_name;

	// 			var totalCost = 0;
	// 			var numberOfMonths = 0;
	// 			var totalKwh = 0;

	// 			_.each(bill, function (monthlyStatement) {
	// 				numberOfMonths++;
	// 				totalKwh += monthlyStatement.bill_total_kWh;
	// 				var lineItems = monthlyStatement.bill_breakdown.line_items;
	// 				_.each(lineItems, function (item) {
	// 					totalCost += item.cost;
	// 				})
	// 			});

	// 			var averageMonthlyCost = totalCost/numberOfMonths;
	// 			var averageMonthlyKwh = totalKwh/numberOfMonths;

	// 			annualKwh = 0;
	// 			var annualCost = 0;

	// 			if (numberOfMonths < 12) {
	// 				annualCost = averageMonthlyCost * 12;
	// 				annualKwh = averageMonthlyKwh * 12;
	// 			} else {
	// 				for(var i = 0; i < 12; i++) {
	// 					annualKwh += bill[i].bill_total_kWh;
	// 					annualCost += bill[i].bill_total;
	// 				}
	// 			}

	// 			return new Promise(function(resolve) {
	// 				resolve({
	// 					name: name,
	// 					address: address,
	// 					utility: utility,
	// 					rate: rate,
	// 					annualKwh: annualKwh
	// 				});
	// 			});


	// 		})	
	// }
	function appendCustomer(customer) {
		var item = $('<tr class="lineItem"><td class="id">'+customer.id+'</td><td class="name">'+customer.name+'</td><td class="address">'+customer.address+'</td><td class="annualCost">'+customer.annualCost+'</td><td class="annualKwh">'+customer.annualKwh+'</td><td>'+customer.annualSavings+'</td></tr>');
		$('.customer-list').append(item);
	}

	var customerData = {};

	function Customer (customerData) {
		this.name = customerData.name;
		this.location = customerData.location;
		this.utility = customerData.utility;
		this.rate = customerData.rate;
		this.annualUsage = customerData.annualUsage;
	} 

	var ids;
	var names;

	$.ajax('https://utilityapi.com/api/services.json?access_token=hackathontoken')
		.then(function (services) {
			ids = _.pluck(services, 'uid');
			names = _.pluck(services, 'utility_billing_contact');
			_.each(ids, function (id, index) {
				$.ajax('https://utilityapi.com/api/services/'+id+'/bills.json?access_token=hackathontoken')
					.done(function (bill) {
						address = bill[0].utility_service_address;
						utility = bill[0].utility;
						rate = bill[0].utility_tariff_name;

						var totalCost = 0;
						var numberOfMonths = 0;
						var totalKwh = 0;

						_.each(bill, function (monthlyStatement) {
							numberOfMonths++;
							totalKwh += monthlyStatement.bill_total_kWh;
							var lineItems = monthlyStatement.bill_breakdown.line_items;
							_.each(lineItems, function (item) {
								totalCost += item.cost;
							})
						});

						var averageMonthlyCost = totalCost/numberOfMonths;
						var averageMonthlyKwh = totalKwh/numberOfMonths;

						annualKwh = 0;
						var annualCost = 0;

						if (numberOfMonths < 12) {
							annualCost = averageMonthlyCost * 12;
							annualKwh = averageMonthlyKwh * 12;
						} else {
							for(var i = 0; i < 12; i++) {
								annualKwh += bill[i].bill_total_kWh;
								annualCost += bill[i].bill_total;
							}
						}

						var customer = {
							name: names[index],
							id: ids[index],
							address: address,
							utility: utility,
							rate: rate,
							annualCost: numeral(annualCost).format('$0,0.00'),
							annualKwh: numeral(annualKwh).format('0,0.00'),
							annualSavings: numeral(annualKwh * .03).format('$0,0.00')
						}
						customerData[customer.id] = customer;

						appendCustomer(customer);
						if(index === ids.length - 1) {
							var stringy = JSON.stringify(customerData)
							sessionStorage.setItem('customerData', stringy);
						}
					})
					 // end done
				});// end ajax
			});	// end each


	// $('.mapIt').on('click', function() {
	// 	// e.preventDefault();
	// 	debugger
	// 	$('#data').slideUp(function() {
	// 		// $('#data').load('pages/SolarProjectsMap.html', {
	// 		// 	done: function() {
	// 		// 		$('#data').delay(400).slideDown();
	// 		// 	}
	// 		// });
	// 	});
	// });

// debugger
}); // end on ready

