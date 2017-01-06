(function($){
	$(window).scroll(function(){

		var document_top = $(window).scrollTop() - $('#news_module').offset().top;
		//console.log(document_top)
		//$('#news_module .wrapper').css('top', document_top+'px')
	});
})(jQuery);