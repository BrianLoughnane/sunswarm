Parse.initialize("KMXJi39L5mHkKU0RGNmqX2xvV3N8xfD6xht4ZeyJ", "XWCUCmyNphIpRGK0KcwNuVv2XbC2QVcZvtfpm3SS");

var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
  testObject.save({foo: "bar"}, {
  success: function(object) {
    $(".success").show();
  },
  error: function(model, error) {
    $(".error").show();
  }
});

function submitSolarProject() {

	var SolarProject = Parse.Object.extend("SolarProject");

	var solarProject = new SolarProject();
	solarProject.save({
		name: document.getElementById("name").value, 
		size: document.getElementById("size").value,
		address: document.getElementById("address").value,
		county: document.getElementById("county").value,
		utility: document.getElementById("utility").value,
		kwh: document.getElementById("kwh").value
	},
	{ 
		success: function(object) {
			$(".success").show();
		},
		error: function(model, error) {
			$(".error").show();
		}
	});
}

function getSolarProjects() {

	var SolarProject = Parse.Object.extend("SolarProject");
	var query = new Parse.Query(SolarProject);

	var solarProjects = new Array();
	query.find({
	  success: function(results) {
	    alert("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) { 
	      var object = results[i];
	      var solarProject = {};
	      solarProject["name"] = object.get('name'); 
	      solarProject["size"] = object.get('size'); 
	      solarProject["county"] = object.get('county'); 
	      solarProject["address"] = object.get('address'); 
	      solarProject["utility"] = object.get('utility'); 
	      solarProject["kwh"] = object.get('kwh'); 

	      solarProjects.push(solarProject);
	    }
	    return solarProjects;
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}