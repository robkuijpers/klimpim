var app = (function(document, $) {

	'use strict';
	var docElem = document.documentElement,

		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
			_userAgentInit();
		};

	return {
		init: _init
	};

})(document, jQuery);

var _APP_ = 'myApp';

angular.module(_APP_, []);

(function() {

	'use strict';
	app.init();
        
})();


$('.topmenu li a').removeClass('active');
var menuIdx = $('head meta[name="menuid"]').attr('content');
var newItem = $('.topmenu li')[menuIdx];
$(newItem).find('a').addClass('active');
