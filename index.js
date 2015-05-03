var http = require('http');
var querystring = require('querystring');
var request = require('request');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000))
// app.use(express.static(__dirname + '/index.html'));
app.use(express.static(__dirname));

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


app.get('/activate/:uid', function(req, res) {    
    var uid = req.params.uid;

    request.post('https://utilityapi.com/api/accounts/'+ uid + '/modify.json?'+token,
    	{
    		form: {
		    	'active_until' : 'now',
		    	'update_data' : 'true'
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

	var poll = setInterval(function() {
		if(updated) {
			debugger
			console.log('closing poll')
			clearInterval(poll);
			return
		} else {
			// request('https://utilityapi.com/api/services/'+ uid + '/bills.json?'+token, function (error, response, body) {
			var r = request('https://utilityapi.com/api/services/'+ 5574 + '/bills.json?'+token, function (error, response, body) {
				if(error) {
					debugger
					console.log('unsuccessful poll')
					return
				} else if(!error && response.statusCode == 200) {
					debugger
					updated = true;
					console.log('complete', body);
				}
			});

			if(updated) {
				debugger
				r.pipe(res);
			}		
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
})