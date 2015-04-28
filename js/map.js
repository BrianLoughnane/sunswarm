var consumerData = JSON.parse(sessionStorage.getItem('consumerData'));

var geocoder;
var map;
var latitude = 37;
var longitude = -122;
var sunImage = '../images/sun.png';
var houseImage = '../images/house.png';
function setLatLong(lat, long) {
  latitude = lat;
  longitude = long;
  initialize();
}
// Parse.initialize("KMXJi39L5mHkKU0RGNmqX2xvV3N8xfD6xht4ZeyJ", "XWCUCmyNphIpRGK0KcwNuVv2XbC2QVcZvtfpm3SS");

// function getSolarProjects() {
  
//   var SolarProject = Parse.Object.extend("SolarProject");
//   var query = new Parse.Query(SolarProject);

//   var solarProjects = new Array();
//   query.find({
//     success: function(results) {
//       alert("Successfully retrieved " + results.length + " scores.");
//       // Do something with the returned Parse.Object values
//       for (var i = 0; i < results.length; i++) { 
//         var object = results[i];
//         var solarProject = {};
//         solarProject["name"] = object.get('name'); 
//         solarProject["size"] = object.get('size'); 
//         solarProject["county"] = object.get('county'); 
//         solarProject["address"] = object.get('address'); 
//         solarProject["utility"] = object.get('utility'); 
//         solarProject["kwh"] = object.get('kwh'); 

//         solarProjects.push(solarProject);
//       }
//     return solarProjects;
//     },
//     error: function(error) {
//       alert("Error: " + error.code + " " + error.message);
//     }
//   });
// }
function codeAddress(address, image) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          icon: image
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function loadAddresses() {
  _.each(consumerData, function (consumer) {
    _.delay(codeAddress, 500, consumer.address + ' Oakland, CA', houseImage);
  });

  var solarProjects = ['149 Montecito Ave', '45500 Fremont Blvd', '426 17th St', '2026 Broadway', '88 Collin P Kelly Jr '];

  _.each(solarProjects, function (project) {
    var address = project + ' Oakland, CA';
    _.delay(codeAddress, 300, address, sunImage);
  });
}


function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(latitude, longitude);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  loadAddresses();
}



google.maps.event.addDomListener(window, 'load', initialize);