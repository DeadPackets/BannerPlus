'use strict';
function makeBannerScream() { // eslint-disable-line no-unused-vars
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		const frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
		$(frame).find('html').css('text-transform', 'uppercase');
		$(frame).find('td').css('text-transform', 'uppercase');
		$(frame).find('input').css('text-transform', 'uppercase');
		$(frame).find('option').css('text-transform', 'uppercase');
	} else {
		$('html').css('text-transform', 'uppercase');
		$('td').css('text-transform', 'uppercase');
		$('input').css('text-transform', 'uppercase');
		$('option').css('text-transform', 'uppercase');
	}
}