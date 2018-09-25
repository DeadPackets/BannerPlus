'use strict';
function showDueFees() { // eslint-disable-line no-unused-vars
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		console.error('Show Due Fees is only enabled with Persistent Login');
	} else {
		if (document.location.href.indexOf('P_StdSofStart') < 0) {
			const url = 'https://banner.aus.edu/axp3b21h/owa/aus_std_sof.aus_P_StdSofStart';
			const frame = document.createElement('iframe');
			frame.setAttribute('src', url);
			frame.style.width = '0';
			frame.style.height = '0';
			document.body.appendChild(frame);
			frame.addEventListener('load', function () {
				const fees = parseFloat($(this.contentWindow.document).find('table.datadisplaytable tbody tr:nth-last-child(3) th:nth-child(2)').text());
				if (fees <= 0) {
					console.log('No due fees found!');
					return true;
				} else {
					if ($(this.contentWindow.document)[0].body.innerHTML.indexOf('User Login') > -1) {
						console.warn('You are not logged in for View Due Fees to work!');
					} else {
						new Noty({
							type: 'warning',
							text: 'You have some due fees! Click here to see them.',
							theme: 'relax',
							timeout: 5000,
							progressBar: true,
							buttons: [
								Noty.button('Go', 'btn', () => {
									window.location.replace(url);
								})
							]
						}).show();
					}
				}
				$(this).hide();
			});
		}
	}
}