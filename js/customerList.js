$(document).on('ready', function() {

	function appendCustomer(customer) {
		var item = $('<tr class="lineItem"><td class="id">'+customer.uid+'</td><td class="name">'+customer.name+'</td><td class="address">'+customer.address+'</td><td class="annualCost">'+customer.annualCost+'</td><td class="annualKwh">'+customer.annualKwh+'</td><td>'+customer.annualSavings+'</td></tr>');
		$('.customer-list').append(item);
	}

	var consumerData;
	var outsideP = new Promise(function (resolve) {
		$.ajax('https://utilityapi.com/api/services.json?access_token=hackathontoken')
			.then(function (data) {
				resolve(
					Promise.all(
						_.map(data, function (consumer) {

							var id = consumer.uid;
							var consumer = {
								uid: id,
								name: consumer.utility_billing_contact,
								utility: consumer.utility,
								address: consumer.utility_service_address,
								rate: consumer.utility_tariff_name,
								billCount: consumer.bill_count
							}

							var p = new Promise(function (resolve, reject) {
								$.ajax('https://utilityapi.com/api/services/'+id+'/bills.json?access_token=hackathontoken')
									.then(function (bills) {
										var annualCost = bills.map(function (bill) { 
											return bill.bill_total; 
										}).reduce(function (accum, next) {
											return accum + next;
										});
										
										var annualKwh = bills.map(function (bill) { 
											return bill.bill_total_kWh; 
										}).reduce(function (accum, next) {
											return accum + next;
										});

										var billInfo = {						
											annualCost: numeral(annualCost).format('$0,0.00'),
											annualKwh: numeral(annualKwh).format('0,0.00'),
											annualSavings: numeral(annualKwh * .03).format('$0,0.00')
										}

										var consumerData = _.extend(consumer, billInfo);
										appendCustomer(consumerData);
										resolve(consumerData);
									}); // end then
							}); // end p declaration

							return p;

						}) // end map
					) // end
				) // end outsideP resolve 
			}); // end then 
	}); // end outsideP

	outsideP.then(function (consumerData) {
		var stringy = JSON.stringify(consumerData)
		sessionStorage.setItem('consumerData', stringy);
	});

}); // end on ready

