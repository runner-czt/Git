	$(document).ready(function() {
		var links = $('.link');
		links.each(function () {
			$(this).bind('click', function () {
				$('#content').attr('src', $(this).attr('url'));
			});
		});
	});

