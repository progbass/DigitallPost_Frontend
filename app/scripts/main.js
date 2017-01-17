(function($){
	// Main Variables
	var mobile_mode = true;
	var bp_desktop = 900;
	var menu_open = false;
	var menu_hide_interval = 0;
	var menu_page_lastPos = 0;
	var search_open = false;


	/*----------------------------------------------------
	//	FUNCTIONS
	----------------------------------------------------*/
	// Window Scroll
	function onScroll(){
		// Scroll Variables
		var window_scroll = $(window).scrollTop();

		////////////////////
		// MOBILE MENU 
		// Get header position and height
		var header_position = $('header').offset().top;
		var header_height = header_position + $('header .photo_holder').height();

		// If mobile menu is hidden
		if(!menu_open){
			// If scroll has passed header position, show fixed menu
			if(window_scroll >= header_height){
				$('#main_menu').toggleClass('fixed', true)
			} else {
				$('#main_menu').toggleClass('fixed', false)
			}
		}


		////////////////////
		// MOBILE MENU
		// If mobile menu is hidden, update scroll last position
		if(!menu_open)
			menu_page_lastPos = window_scroll;

	}

	// WINDOW RESIZE HANDLER
	function onResize(){
		// Update Image Ratios
		$('img').each(function() {
			updateImagesRatios($(this));
		});

		// Update App Mode
		if( $(window).innerWidth() >= bp_desktop){
			mobile_mode = false;

		} else {
			mobile_mode = true;
		}

		// Hide Mobile Menu
		toggleMobileMenu(false);



		// Enable / Disable Scroll from news feed
		if( $(window).innerWidth() >= 728){
			// Enable
			$('#news_module .news_holder').mCustomScrollbar('update');

		} else {
		console.log('asdasd')
			// Disable 
			$('#news_module .news_holder').mCustomScrollbar('disable');
		}
	}


	// UPDATE IMAGE ASPECT RATIOS
	function updateImagesRatios(_target){
		// Get ratios of container and image iself
		var holder_ratio = _target.parent().height() / _target.parent().width();
		var image_ratio = _target.height() / _target.width();

	    // Compare ratios and fix image layout
	    if(holder_ratio > image_ratio) {
			_target.toggleClass('vertical', true);
	    } else {
			_target.toggleClass('vertical', false);
	    }
	}


	// OPEN / CLOSE MOBILE MENU
	function toggleMobileMenu(_flag){
		// Update mobile menu flag
		menu_open = _flag;

		// Change styles of menu elements
		$('#mobile_menu').toggleClass('visible', menu_open);
		$('#main_menu #search_frm').toggle(!menu_open);
		$('#main_menu').toggleClass('mobileMenu', menu_open);

		// If mobile menu is open
		if(menu_open){
			// Update menu styles
			$('#main_menu').removeClass('fixed').css('position', 'fixed');
			
			// Hide website content to prevent scrolling
			menu_hide_interval = setInterval(function(){
				// Hide all but menu
				$('#main_container > :not(#main_menu)').css({
					'visibility': 'hidden',
				});
			}, 1000);


		// If mobile menu is hidden
		} else {
			// prevent hidding website content
			clearInterval( menu_hide_interval );

			// Show website content
			$('#main_container > :not(#main_menu)').css({
				'visibility': 'visible',
			});

			// Scroll to last postition
			$(window).scrollTop(menu_page_lastPos);
			onScroll();
		}
	}

	// OPEN / CLOSE SEARCH LIGHTBOX
	function toggleSearchWindow( _target ){
		search_open = _target;
		$('#search_module').toggleClass('visible', search_open);
	}





	/*----------------------------------------------------
	//	WINDOW EVENTS
	----------------------------------------------------*/
	// SCROLL
	$(window).scroll(onScroll);

	// RESIZE
	$(window).on('resize', onResize);



	

	/*----------------------------------------------------
	//	MOBILE MENU
	----------------------------------------------------*/
	// MENU ICON BUTTON
	$('#main_menu .menu_icon').click(function(e){
		//menu_open = !menu_open;
		toggleMobileMenu(!menu_open);

		///
		return false;
	});




	/*----------------------------------------------------
	//	MAIN MENU
	----------------------------------------------------*/
	// Open Search Lightbox
	$('a.searchWindowOpen_btn').click(function(_e){
		_e.preventDefault();
		toggleSearchWindow(!search_open);
	});
	$('#search_module .overlay').click(function(_e){
		_e.preventDefault();
		toggleSearchWindow(false);
	});

	

	/*----------------------------------------------------
	//	RESPONSIVE / PROPORTIONAL IMAGES
	----------------------------------------------------*/
	// Hide images and add event listener
	$('img')
	//.css({ 'visibility': 'hidden'})
	//.fadeOut(0)
	.on('load', function() {
		// Update image aspect after load
		updateImagesRatios($(this));

		// Show image
		//$(this).css({ 'visibility': 'visible'})
		//.fadeIn();
	});


	/*----------------------------------------------------
	//	CUSTOM SCROLLBAR
	----------------------------------------------------*/
	$(window).on('load',function(){
        $('#news_module .news_holder').mCustomScrollbar({
        	//live: 'off',
        	callbacks:{
			    onUpdate:function(){
			    	// disable scrollbars 
			     	$('#news_module .news_holder').mCustomScrollbar('disable');
			     	
			     	// check screen resolution 
			     	onResize();
			    }
			}
        });
    });


    //
    onResize();


})(jQuery);