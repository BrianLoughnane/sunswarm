$(document).on('ready', function() {

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
		} else if(scrollTop > lastScrollTop) {
			$('header').slideUp();
		} else {
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
		if(checkbox.attr('checked') !== 'checked') {
		  checkbox.click();
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
	});

});