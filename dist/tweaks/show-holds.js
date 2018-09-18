function showHolds() {
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		console.error('Show Holds is only enabled with Persistent Login');
	} else {
		if (document.location.href.indexOf('P_ViewHold') < 0) {
			const url = 'https://banner.aus.edu/axp3b21h/owa/bwskoacc.P_ViewHold';
			const frame = document.createElement('iframe');
			frame.setAttribute('src', url);
			frame.style.width = '0';
			frame.style.height = '0';
			document.body.appendChild(frame);
			frame.addEventListener('load', function () {
				const text = $(this.contentWindow.document).find('.warningtext').text();
				if (text.indexOf('No holds exist') > -1 || $($(this.contentWindow.document)[0]).find('input[name="_pd"]').length !== 0) {
					console.log('No holds found!');
					return true;
				} else {
					if ($(this.contentWindow.document)[0].body.innerHTML.indexOf('User Login') > -1) {
						console.warn('You are not logged in for View Holds to work!');
					} else {
						new Noty({
							type: 'warning',
							text: 'You have some registration holds! Click here to see them.',
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