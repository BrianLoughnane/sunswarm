//$(document).on('ready', function() {
$(window).load(function() {	

	// function library

	function goTo(location) {
	  $('body').animate({scrollTop: location}, 1000);
	}

	function toggleMenu() {
	  $('.main-nav')
	  	.toggleClass('see-menu')
	  	.toggleClass('hide-menu');
	}

	function hideMenu() {
		$('.main-nav')
			.removeClass('see-menu')
			.addClass('hide-menu');
	}

	function showMenu() {
		$('.main-nav')
			.removeClass('hide-menu')
			.addClass('see-menu');
	}

	var lastScrollTop = 0;

	$(window).on('scroll', function() {
		hideMenu();

		var scrollTop = $('body').scrollTop();

		if (scrollTop <= 85) {
			return
		} else if(scrollTop > lastScrollTop + 10) {
			$('header').slideUp();
		} else if(scrollTop < lastScrollTop - 10) {
			$('header').slideDown();
		}

		lastScrollTop = scrollTop;
	});

	

	$('.log-in').on('click', function() {
		var location = $('#log-in').offset().top;
		goTo(location);
	});

	$('.sign-up').on('click', function() {
		var checkbox = $('.new-user-checkbox');
		var iWantField = $('.main-fieldset .user-type');
		if(checkbox.attr('checked') !== 'checked') {
		  checkbox.click();
		  iWantField.show();
		}
	});

	$('.menu-button').on('mouseover', function() {
		if($('.main-nav').hasClass('hide-menu')) {
		  showMenu();
		}
	});

	$('.main-nav').on('mouseleave', function() {
		hideMenu();
	});

	$('.new-user-checkbox').on('click', function() {
		$('.terms-checkbox').fadeToggle('fast');
		$('.password-confirm').slideToggle('fast');
		$('.main-fieldset .user-type').slideToggle('fast');
	
	});

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
				window.location.replace("Consumers/list/Customers.html");
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
				window.location.replace("Consumers/list/Customers.html");
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