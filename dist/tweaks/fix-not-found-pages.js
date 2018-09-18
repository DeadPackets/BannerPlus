function fixNotFoundPages() {
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		console.warn('No support without persistent login.');
	} else {
		if ($('h1:contains(Not Found)').length === 1) {
			//TODO: Improve this.
			window.location.replace('https://banner.aus.edu/axp3b21h/owa/twbkwbis.P_WWWLogin');
		}
	}
}