(function($){
	var mobile_mode = true;
	var bp_desktop = 2000;
	var menu_open = false;
	var menu_hide_interval = 0;
	var menu_page_lastPos = 0;


	function onScroll(){
		var window_scroll = $(window).scrollTop();
		var header_position = $('header').offset().top;
		var header_height = header_position + $('header .photo_holder').height();

		//
		if(!menu_open)
			menu_page_lastPos = window_scroll;


		//
		if(!menu_open){
			if(window_scroll >= header_height){
				$('#main_menu').toggleClass('fixed', true)
			} else {
				$('#main_menu').toggleClass('fixed', false)
			}
		}
	}
	$(window).scroll(onScroll);


	$(window).on('resize', function(){
		//
		$('img').each(function() {
			updateImagesRatios($(this));
		});

		//
		if( $(window).innerWidth >= bp_desktop){
			mobile_mode = false;
		} else {
			mobile_mode = true;
		}

		//
		toggleMobileMenu(false);
	});



	function updateImagesRatios(_target){
		//
		var holder_ratio = _target.parent().height() / _target.parent().width();
		var image_ratio = _target.height() / _target.width();

	    
	    if(holder_ratio > image_ratio) {
			_target.toggleClass('vertical', true);
	    } else {
			_target.toggleClass('vertical', false);
	    }
	}


	$('#main_menu .menu_icon').click(function(e){
		//menu_open = !menu_open;
		toggleMobileMenu(!menu_open);

		///
		return false;
	});

	function toggleMobileMenu(_flag){
		var flag = _flag;
		menu_open = flag;

		$('#mobile_menu').toggleClass('visible', menu_open);
		$('#main_menu #search_frm').toggle(!menu_open);
		$('#main_menu').toggleClass('mobileMenu', menu_open);

		if(menu_open){
			$('#main_menu').removeClass('fixed').css('position', 'fixed');
			
			menu_hide_interval = setInterval(function(){
				$('#main_container > :not(#main_menu)').css({
					'visibility': 'hidden',
				});

				//$('#main_container > :not(#main_menu)').hide();
			}, 1000);

		} else {
			clearInterval( menu_hide_interval );
			// $('#main_container').css({
			// 	'overflow': 'visible',
			// 	'height': 'auto'
			// });
			$('#main_container > :not(#main_menu)').css({
				'visibility': 'visible',
			});
			$(window).scrollTop(menu_page_lastPos);
			onScroll();
		}
	}


	$('img').on('load', function() {
		updateImagesRatios($(this));
	});

})(jQuery);