(function($) {

	"use strict";

	var win = $(window),
		ww = window.innerWidth,
		wh = window.innerHeight;

	main_nav();
	heros();
	skills();
	blog();
	shortcodes();

	win.on('load', function() {
		$('body').waitForImages({
			finished: function() {
				setTimeout(function() {
					$('.loader-mask').addClass('hide');

					reveals();
				}, 1000);
			},
			waitForAll: true
		});
	});

	win.on('resize', function() {
		ww = window.innerWidth;
		wh = window.innerHeight;

		main_nav();
		heros();
	});


	// main nav
	// --------------------

	$('.menu li:has(ul)').find('a:first').addClass('parent');

	function main_nav() {
		if (ww > 800) {
			$('.main-nav').show();
			$('.trigger').hide().removeClass('active');
			$('.mobile-nav').hide().removeClass('visible');

			$('.menu li:has(ul)').off('mouseenter mouseleave');
			$('.menu li:has(ul)').find('a').off('click');

			$('.menu li:has(ul)').on('mouseenter', function() {
				$(this).find('ul').show();
				$(this).find('ul:first').addClass('visible');
			}).on('mouseleave', function() {
				$(this).find('ul').hide();
				$(this).find('ul:first').removeClass('visible');
			});

			$('.menu li:has(ul)').find('a').on('click', function() {
				var parent = $(this).parent(),
					submenu = $(this).next('ul');

				if (parent.children('ul').length == 0) return true;
				else return false;
			});
		} else {
			$('.main-nav').hide();
			$('.trigger').show();
			$('.mobile-nav').show();

			$('.menu li:has(ul)').children('ul').hide();
			$('.menu li:has(ul)').off('mouseenter mouseleave');
			$('.menu li:has(ul)').find('a').off('click');

			$('.menu li:has(ul)').find('a').on('click', function() {
				var parent = $(this).parent(),
					submenu = $(this).next('ul');

				if (submenu.is(':visible'))
					parent.find('ul').slideUp(300);

				if (submenu.is(':hidden')) {
					parent.siblings().find('ul').slideUp(300);
					submenu.slideDown(300);
				}

				if (parent.children('ul').length == 0) return true;
				else return false;
			});
		}
	}

	$('.trigger').on('click', function() {
		$(this).toggleClass('active');
		$('.mobile-nav').html($('.main-nav').html()).toggleClass('visible');

		main_nav();
	});


	// heros
	// --------------------

	function heros() {
		var hh = (wh - $('.header').height());

		$('.hero').each(function() {
			if ($(this).hasClass('small')) {
				$(this).css('height', hh * 0.5);
			} else {
				$(this).css('height', hh);
			}
		});
	}


	// skills
	// --------------------

	function skills() {
		win.on('scroll', function() {
			var scroll = $(this).scrollTop();

			$('.skills').each(function() {
				if ($(this).offset().top < (scroll + wh)) {
					var skill = $(this).find('.skill');

					skill.each(function(i) {
						$(this).delay(i * 50).queue(function(next) {
							var bar = $(this).find('.skill__bar__percent');

							if (!bar.hasClass('animated')) {
								bar.addClass('animated');

								bar.animate({
									'width': bar.data('percent') + '%'
								});

								next();
							}
						});
					});
				}
			});
		});
	}


	// blog
	// --------------------

	function blog() {
		$('.posts__list .post').each(function() {
			var post = $(this),
				bg = post.data('thumb'),
				thumbs = $('.posts__list .posts__thumbs');

			post.find('a').on('mouseenter', function() {
				var thumbs_width = Math.round(Math.random() * (300 - 200) + 300),
					thumbs_height = Math.round(Math.random() * (200 - 100) + 200),
					min_ypos = 20,
					max_ypos = ((wh - thumbs_height) - 20),
					thumbs_ypos = Math.round(Math.random() * (max_ypos - min_ypos) + min_ypos),
					min_xpos = 20,
					max_xpos = ((ww - thumbs_width) - 20),
					thumbs_xpos = Math.round(Math.random() * (max_xpos - min_xpos) + min_xpos);

				thumbs.addClass('visible').css({
					'width': thumbs_width,
					'height': thumbs_height,
					'top': thumbs_ypos,
					'left': thumbs_xpos,
					'background-image': 'url(' + bg + ')',
					'background-size': 'cover',
					'background-position': 'center center'
				});

				$('.posts__list .post').stop().animate({
					'opacity': 0.2
				}, 200);

				post.stop().animate({
					'opacity': 1
				});
			}).on('mouseleave', function() {
				thumbs.removeClass('visible');

				$('.posts__list .post').stop().animate({
					'opacity': 1
				}, 200);
			});
		});
	}


	// reveals
	// --------------------

	function reveals() {
		$(window).on('scroll', function() {
			$('.reveal').each(function(i) {

				var el_top = $(this).offset().top,
					win_bottom = wh + $(window).scrollTop();

				if (el_top < win_bottom) {
					$(this).delay(i * 100).queue(function() {
						$(this).addClass('reveal-in');
					});
				}

			});
		}).scroll();
	}


	// shortcodes
	// --------------------

	function shortcodes() {
		// background images
		$('[data-bg]').each(function() {
			var bg = $(this).data('bg');

			$(this).css({
				'background-image': 'url(' + bg + ')',
				'background-size': 'cover',
				'background-position': 'center center',
				'background-repeat': 'no-repeat'
			});
		});

		// background colors
		$('[data-bg-color]').each(function() {
			var bg = $(this).data('bg-color');

			$(this).css({
				'background-color': bg
			});
		});

		// magnific popup
		$('.magnific-popup').each(function() {
			var gallery = $(this).data('gallery') == true ? 1 : 0;

			$(this).magnificPopup({
				delegate: 'a',
				type: 'image',
				gallery: {
					enabled: gallery
				}
			});
		});

		// owl slider
		$('.slider').each(function() {
			var slider = $(this),
				dots = slider.data('dots') == true ? 1 : 0,
				arrows = slider.data('arrows') == true ? 1 : 0,
				items = typeof(slider.data('items')) !== "undefined" ? parseInt(slider.data('items'), 10) : 1,
				margin = typeof(slider.data('margin')) !== "undefined" ? parseInt(slider.data('margin'), 10) : 0;

			slider.owlCarousel({
				autoplay: true,
				items: items,
				loop: true,
				nav: arrows,
				dots: dots,
				margin: margin,
				navText: ['', '']
			});
		});

		// back2top
		win.on('scroll', function() {
			var scroll = $(this).scrollTop();

			if (scroll > 100) {
				$('.back2top').addClass('visible');
			} else {
				$('.back2top').removeClass('visible');
			}
		});

		$('.back2top').on('click', function() {
			$('html, body').animate({
				scrollTop: 0
			}, 300);
		});
	}

})(jQuery);
