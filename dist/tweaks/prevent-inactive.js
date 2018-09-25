'use strict';
function preventInactive() { // eslint-disable-line no-unused-vars
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		console.error('Prevent Inactive Login is not supported without Persistent Login enabled.');
	} else {
		setTimeout(() => {
			location.reload();
		}, 300000);
		//300000
	}
}