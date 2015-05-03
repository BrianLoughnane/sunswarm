$(document).on('ready', function() {
	//user auth
    $("#submit").on("click", auth);
    $(".entry-buttons .log-out").on("click", logOut);
    
    function auth() {

    	var newUserCheckbox = $('.new-user-checkbox');
    	var termsCheckbox = $('.terms-checkbox input');

    	if(newUserCheckbox.attr('checked') === 'checked') {
    		var password = $('#password').val();
			var confirmPassword = $('#confirmPassword').val();
			var type = $('.main-fieldset .user-type').val();

			if(termsCheckbox.attr('checked') === 'checked') {
				if(password === confirmPassword) {
	    			signUp($("#email").val(), password, type);
	    		} else {
	    			$('.error').text("Passwords must match");
	    			$('.error').show();
	    		}
	    	}
    	} else {
    		signIn($("#email").val(), $("#password").val());
    	}
    }
    
    function signUp(email, password, type) {
		
		var user = new Parse.User();
		user.set("username", email);
		user.set("password", password);
		user.set("email", email);
		user.set("type", type);

		user.signUp(null, {
			success: function(user) {
				window.location.replace("dashboard/dashboard.html");
			},
			error: function(user, error) {
				// Show the error message somewhere and let the user try again.
				//alert("Error: " + error.code + " " + error.message);
				$(".error").text(error.message);
				$(".error").show();
			}
		});

	}

	function signIn(email, password) {
		Parse.User.logIn(email, password, {
			success: function(user) {
				window.location.replace("dashboard/dashboard.html");
			},
			error: function(user, error) {
				//alert("Error: " + error.code + " " + error.message);
				$(".error").text(error.message);
				$(".error").show();
			}
		});

	}

	function logOut() {
		Parse.User.logOut();
		setAuthState();
	}

	/*
	Needs to be called when the users login/logout state changes
	*/
	function setAuthState(){
		var currentUser = Parse.User.current(); 

		var isLoggedIn = currentUser !== null;
		if(isLoggedIn) {
			$('.entry-buttons .log-in').hide();
			$('.entry-buttons .sign-up').hide();
			$('.entry-buttons .log-out').show();
		} else {
			$('.entry-buttons .log-in').show();
			$('.entry-buttons .sign-up').show();
			$('.entry-buttons .log-out').hide();
		}

	}

	setAuthState();

});