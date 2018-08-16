'use strict';

/* global $, window, document, ajaxify, app, config */

$(document).ready(function () {
	var url = window.location.protocol + '//' + window.location.host + config.relative_path;

	$(window).on('action:ajaxify.end', function () {
		if (ajaxify.data.template.topic) {
			insertSocialIcons();

			$(window).on('action:posts.loaded', function (ev, data) {
				for (var i in data.posts) {
					if (data.posts.hasOwnProperty(i)) {
						var pid = data.posts[i].pid;
						insertSocialIcons(pid);
					}
				}
			});

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

	function insertSocialIcons(pid) {
		var posts = pid ? '[component="post"][data-pid="' + pid + '"]' : '[component="post"]';
		$(posts).each(function () {
			var post = $(this);
			if (post.find('.nodebb-plugin-share-post-icons').length) {
				return;
			}

			app.parseAndTranslate('partials/nodebb-plugin-share-post-icons/share', {}, function (tpl) {
				$(tpl).insertBefore(post.find('.post-tools'));
			});
		});
	}
});
