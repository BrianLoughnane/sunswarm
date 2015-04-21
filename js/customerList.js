$(document).on('ready', function() {

	function appendCustomer(customer) {
		var item = $('<tr class="lineItem"><td class="id">'+customer.uid+'</td><td class="name">'+customer.name+'</td><td class="address">'+customer.address+'</td><td class="annualCost">'+customer.annualCost+'</td><td class="annualKwh">'+customer.annualKwh+'</td><td>'+customer.annualSavings+'</td></tr>');
		$('.customer-list').append(item);
	}

	
	var p = new Promise(function (resolve, reject) {
		var consumerData = {};

		$.ajax('https://utilityapi.com/api/services.json?access_token=hackathontoken')
			.then(function (data) {
				_.each(data, function (consumer, index) {
					var id = consumer.uid;
					var consumer = {
						uid: id,
						name: consumer.utility_billing_contact,
						utility: consumer.utility,
						address: consumer.utility_service_address,
						rate: consumer.utility_tariff_name,
						billCount: consumer.bill_count
					}

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

							var customerInfo = _.extend(consumer, billInfo);
							consumerData[id] = customerInfo;
							appendCustomer(customerInfo);
							
							if(index === data.length - 1) {
								resolve(consumerData);
							}
						});
				});
			});
	});

	p.then(function (consumerData) {
		var stringy = JSON.stringify(consumerData)
		sessionStorage.setItem('consumerData', stringy);
	});

}); // end on ready

