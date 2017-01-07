(function($){
	$(window).scroll(function(){
		var window_scroll = $(window).scrollTop();
		var header_position = $('header').offset().top;
		var header_height = header_position + $('header').height();
		//console.log(window_scroll+'  :  '+header_height)
		//$('#news_module .wrapper').css('top', document_top+'px')
		//
		if(window_scroll >= header_height){
			$('#main_menu').toggleClass('fixed', true)
		} else {
			$('#main_menu').toggleClass('fixed', false)
		}
	});


	$('#main_menu .menu_icon').click(function(e){
		$('#mobile_menu').toggleClass('visible');
		$('#main_menu #search_frm').hide(false);
		return false;
	});
})(jQuery);