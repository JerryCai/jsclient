var enable = false;
var GoogleAnalytics = GoogleAnalytics || ( function(enable) {
		enable && ( function(b, o, i, l, e, r) {
				b.GoogleAnalyticsObject = l;
				b[l] || (b[l] = function() {
					(b[l].q = b[l].q || []).push(arguments);
				});
				b[l].l = +new Date;
				e = o.createElement(i);
				r = o.getElementsByTagName(i)[0];
				e.src = '//www.google-analytics.com/analytics.js';
				r.parentNode.insertBefore(e, r);
			}(window, document, 'script', 'ga'));

		enable && client.register({
			name : 'google',
			actions : {
				init : function() {
					ga('create', 'UA-XXXXX-X');
					ga('send', 'pageview');
					alert('google....');
				}
			}
		});
	}(enable));
