'use strict';
function evadeBlocking() { // eslint-disable-line no-unused-vars
	const test = $('.stripe').text().match(/url|requested|rejected/ig);
	if (test) {
		if (test.length === 3) {
			chrome.runtime.sendMessage({signal: 'evadeBlocking'});
		}
	}
}