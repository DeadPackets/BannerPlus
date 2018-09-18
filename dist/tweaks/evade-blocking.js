function evadeBlocking() {
	const test = $('.stripe').text().match(/url|requested|rejected/ig);
	if (test) {
		if (test.length === 3) {
			chrome.runtime.sendMessage({signal: 'evadeBlocking'});
		}
	}
}