'use strict';

/* global $, window, document, ajaxify, app, config */

$(document).ready(function () {
	var url = window.location.protocol + '//' + window.location.host + config.relative_path;

	$(window).on('action:ajaxify.end', function () {
		if (ajaxify.data.template.topic) {
			insertSocialIcons();

			$('#content').off('click', '[component="share/linkedin"]').on('click', '[component="share/linkedin"]', function (ev) {
				var pid = $(this).parents('[data-pid]').attr('data-pid');
				var urlToPost = encodeURIComponent(url + '/post' + (pid ? '/' + (pid) : ''));
				var shareURL = 'https://www.linkedin.com/shareArticle?mini=true&url=' + urlToPost;
				window.open(shareURL, '_blank', 'width=550,height=550,scrollbars=no,status=no');
				return false;
			});
			
			
			$('#content').off('click', '[component="share/mail"]').on('click', '[component="share/mail"]', function (ev) {
				var pid = $(this).parents('[data-pid]').attr('data-pid');
				var urlToPost = encodeURIComponent(url + '/post' + (pid ? '/' + (pid) : ''));
				window.location.href = 'mailto:?body=' + urlToPost + '&subject=' + ajaxify.data.title;
				return false;
			});
		}
	});

	function insertSocialIcons() {
		var post = $('[component="post"][data-index="0"]');
		if (post.find('.nodebb-plugin-share-post-icons').length) {
			return;
		}

		app.parseAndTranslate('partials/nodebb-plugin-share-post-icons/share', {}, function (tpl) {
			$(tpl).insertBefore(post.find('.post-tools'));
		});

		app.parseAndTranslate('partials/nodebb-plugin-share-post-icons/share', {}, function (tpl) {
			var html = $('<span class="share-icons-post-bar"></span>').append($(tpl));
			$(html).insertAfter($('.topic > .post-bar .topic-main-buttons'));
		});
	}
});
