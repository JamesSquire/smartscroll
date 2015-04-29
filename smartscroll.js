(function ($) {
	var options = {
		sectionWrapperSelector: ".section-wrapper",
		sectionClass: "section",
		animationSpeed: 300,
		headerText: "header"
	}
	$.smartscroll = function(overrides) {
		$.extend( options, overrides );

		// Mouse Scroll

		var scrolling = false;
		var slideCount = $('.' + options.sectionClass).length;

		var getCurrentSlideIndex = function (floor) {
			var slidePosition = -($('.' + options.sectionClass)[0].getBoundingClientRect().top / $(window).height());
			return floor ? Math.floor(slidePosition) : Math.round(slidePosition);
		}

		var scrollTo = function (slideIndex) {
			scrolling = true;
			var scrollTopVal = $(options.sectionWrapperSelector + ':first').position().top;
			var scrollSpeed = 0;
			if(slideIndex >= 0) {
				scrollTopVal += ( (slideIndex) * $(window).height());
				scrollSpeed = options.animationSpeed;
			} else {
				scrollTopVal -= 53;
			}
			$('body').animate({
		        scrollTop: scrollTopVal
		    }, scrollSpeed, function() {
		    	scrolling = false;
		    });
			return false;
		}

		var scrollUp = function () {
			scrollTo(getCurrentSlideIndex() - 1);
		};
		var scrollDown = function () {
			scrollTo(getCurrentSlideIndex() + 1);
		};
		$(window).bind('mousewheel DOMMouseScroll', function(e){
			if(!scrolling
				&& window.document.body.scrollTop >= $(options.sectionWrapperSelector + ':first').position().top
				) {
				e.preventDefault()
				e.stopPropagation();
				if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
		            scrollUp();
		        }
		        else {
		        	scrollDown();
		        }
			}
	    });
		$('.' + options.sectionClass).css({
			"overflow": "hidden",
			"height": $(window).height()
		});

		$(window).bind('resize', function(e){
			$('.' + options.sectionClass).css({
				"height": $(window).height()
			});
	    });

		// Hash
		
		var currentHash = window.location.hash;
		
		$(window).bind('scroll', function(e){
			var newHash = $('.' + options.sectionClass + ':nth-of-type(' + (getCurrentSlideIndex(true) + 1) + ')').data('hash');
			if(! (window.location.hash === newHash)) {
				if(typeof newHash === 'undefined') {
					window.location.hash = options.headerText;
				} else {
					window.location.hash = newHash;
				}
			}
	    });
	}
}(jQuery));