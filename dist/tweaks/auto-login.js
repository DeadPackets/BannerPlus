function autoLogin() {
	chrome.storage.sync.get(['username', 'password'], (result) => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			//I need absolute URLs for the new page load event to fire :/
			console.error('Auto login not supported without Persistent Login enabled.');
		} else {
			//Check if we are on the login page
			if ($('form[name="loginform"]').length) {
				//Check for login error message
				if ($('.pagebodydiv').text().indexOf('Invalid login information') >= 0) {
					alert('Invalid login settings detected. Please update your username and password in BannerPlus.');
				} else {
					$('input[id="UserID"]').val(result.username);
					$('input[name="PIN"]').val(result.password);
					$('input[type="submit"]').click();
				}
			}
		}
	});
}