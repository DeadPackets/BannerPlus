'use strict';
function biggerCheckboxes() { // eslint-disable-line no-unused-vars
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		const frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
		$(frame).find('input[type="checkbox"]').css('transform', 'scale(2)');
	} else {
		$('input[type="checkbox"]').css('transform', 'scale(2)');
	}
}