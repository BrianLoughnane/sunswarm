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

app.get('/getServices', function (req, res) {
	request('https://utilityapi.com/api/services.json?'+token).pipe(res);
});

app.get('/activate/:uid', function(req, res) {    
    var uid = req.params.uid;

    var d = new Date();
    d.setDate(d.getDate() +1);
    d = new Date(d);

    // request.post('https://utilityapi.com/api/accounts/'+ uid + '/modify.json?'+token,
    // request.post('https://utilityapi.com/api/services/'+ uid + '/modify.json?'+token,
    request.post('https://utilityapi.com/api/services/'+ uid +'/modify.json?'+token,
    	{
    		form: {
		    	'active_until' : 'now',
		    	// 'active_until' : d,
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


app.get('/pollBillingEndpoint/:uid', function (req, res) {
	var uid = req.params.uid;
	var updated = false;
	var requ;
	var poll = setInterval(function() {
		console.log('polling...');
		if(updated) {
			console.log('All updated, closing poll')
			clearInterval(poll);
			console.log('Poll is closed')
			return
		} else {
			console.log('Not updated, about to make request')
			request('https://utilityapi.com/api/services/'+ 5574 + '/bills.json?'+token, function (error, response, body) {
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
	
})

// my attempt below

// app.get('/musicmatch/:track', function(req, res) {
//     var apiUrl = "http://api.musixmatch.com/ws/1.1/track.get";
//     var track = req.params.track;

//     var urlStr = apiUrl + "?track_id=" + track + "&apikey=" + musicApiKey;
//     request(urlStr).pipe(res);
// })

// app.get('/musicmatch/lyrics/:lyrics', function(req, res) {
//     var apiUrl = "http://api.musixmatch.com/ws/1.1/track.lyrics.get";
//     var lyrics = req.params.lyrics;

//     var urlStr = apiUrl + "?track_id=" + lyrics + "&apikey=" + musicApiKey;
//     request(urlStr).pipe(res);
// })

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});