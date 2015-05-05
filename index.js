var http = require('http');
var querystring = require('querystring');
var request = require('request');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000))
// app.use(express.static(__dirname + '/index.html'));
app.use(express.static(__dirname + '/public'));

var token = 'access_token=0c558c78af3f4e219e19f73440714b0d';
var apiUrl = "https://utilityapi.com/api/";

app.get('/createUtilityAPIaccount', function (req, res) {
	request('https://utilityapi.com/api/accounts/add.json?access_token=0c558c78af3f4e219e19f73440714b0d').pipe(res);
});

app.get('/submitUtilityApiInfo/:utilityCode/:signature/:username/:password', function (req, res) {
	var params = req.params;
	var utilityCode = params.utilityCode;
	var signature = params.signature;
	var username = params.username;
	var password = params.password;

	request.post('https://utilityapi.com/api/accounts/add.json?'+token,
		{
			form: {
				"utility" : utilityCode,
				"auth_type" : "owner",
				"real_name" : signature,
				"utility_username" : username,
				"utility_password" : password		
			}
		},
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
	            console.log(body);
	        }
		}
	).pipe(res);
});

app.get('/getServicesUid/:uid', function (req, res) {
	var u_user_uid = req.params.uid;
	var u_service_uid;
	var updated = false;
	var poll = setInterval(function() {
		console.log('Services polling...');
		if(updated) {
			console.log('All updated, closing services poll');
			clearInterval(poll);
			console.log('Services poll is closed');
			return
		} else {

		// 	console.log('Not updated, about to make services request')
			request('https://utilityapi.com/api/services.json?'+token, function (error, response, body) {
				var body = JSON.parse(body);
				console.log('services request made, checking for error')
				if(error) {
					console.log('error found')
					return
				} else {
					for(var i = 0; i < body.length; i++) {
						if(body[i].user_uid === u_user_uid) {
							u_service_uid = body[i].uid;
							updated = true;
							console.log('complete', body);
							res.write(u_service_uid);
							res.end();
							return;
						} // end if statement
					} // end for loop
				} // end else
			}); // end request callback	
		} // end else
	}, 3000); // end setInterval
}); // end getServicesUid

app.get('/activate/:uid', function(req, res) {    
    var uid = req.params.uid;

    // var d = new Date();
    // d.setDate(d.getDate() +1);
    // d = new Date(d);

    request.post('https://utilityapi.com/api/services/'+ uid +'/modify.json?'+token,
    	{
    		form: {
		    	'active_until' : 'now',
		    	'update_data' : true
		    }
    	},
    	function (error, response, body) {
    		if (!error && response.statusCode == 200) {
                console.log(body);
            }
    	}
    ).pipe(res);
});

app.get('/pollIntervalEndpoint/:uid', function (req, res) {
	var uid = req.params.uid;
	var updated = false;
	var poll = setInterval(function() {
		console.log('Interval polling...');
		if(updated) {
			console.log('All updated, closing poll');
			clearInterval(poll);
			console.log('Poll is closed');
			return
		} else {
			console.log('Not updated, about to make intervals request')
			request('https://utilityapi.com/api/services/'+ uid + '/intervals.json?'+token, function (error, response, body) {

				console.log('request made, checking for error')
				if(error) {
					console.log('error found: ', error);
					return
				// } else if(!error && response.statusCode == 200) {
				} else if (body !== "[]") {
					updated = true;
					console.log('Intervals complete with statusCode of ', response.statusCode, body);
					res.write(body);
					res.end();
				}
			});			
		}
	}, 3000);
});

app.get('/pollBillingEndpoint/:uid', function (req, res) {
	var uid = req.params.uid;
	var updated = false;
	var poll = setInterval(function() {
		console.log('polling...');
		if(updated) {
			console.log('All updated, closing poll')
			clearInterval(poll);
			console.log('Poll is closed')
			return
		} else {
			console.log('Not updated, about to make request')
			request('https://utilityapi.com/api/services/'+ uid + '/bills.json?'+token, function (error, response, body) {
			// request('https://utilityapi.com/api/services/'+ 5574 + '/bills.json?'+token, function (error, response, body) {
				console.log('request made, checking for error')
				if(error) {
					console.log('error found')
					return
				} else if(!error && response.statusCode == 200) {
					updated = true;
					console.log('complete', body);
					res.write(body);
					res.end();
				}
			});			
		}

	}, 3000);

});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// app.get('/pollEndpoint/:uid/:endpoint', function (req, res) {
// 	var uid = req.params.uid;
// 	var endpoint = req.params.endpoint;
// 	var updated = false;
// 	var poll = setInterval(function() {
// 		console.log('polling...');
// 		if(updated) {
// 			console.log('All updated, closing poll')
// 			clearInterval(poll);
// 			console.log('Poll is closed')
// 			return
// 		} else {
// 			console.log('Not updated, about to make request')
// 			request('https://utilityapi.com/api/services/'+ uid + '/'+ endpoint +'.json?'+token, function (error, response, body) {
// 			// request('https://utilityapi.com/api/services/'+ 5574 + '/bills.json?'+token, function (error, response, body) {
// 				console.log('request made, checking for error')
// 				if(error) {
// 					console.log('error found')
// 					return
// 				} else if(!error && response.statusCode == 200) {
// 					updated = true;
// 					console.log('complete', body);
// 					res.write(body);
// 					res.end();
// 				}
// 			});			
// 		}

// 	}, 3000);
	
// });
	