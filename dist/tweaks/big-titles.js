'use strict';
function bigTitles() { // eslint-disable-line no-unused-vars
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		const frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
		$(frame).find('.title').css('font-size', '1.5em');
		$(frame).find('.submenulinktext2 ').css('font-size', '1.5em');
		$(frame).find('h2').css('font-size', '1.5em');
	} else {
		$('.title').css('font-size', '1.5em');
		$('.submenulinktext2 ').css('font-size', '1.5em');
		$('h2').css('font-size', '1.5em');
	}
}