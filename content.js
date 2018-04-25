/* eslint-disable */

const tweaks = {
	persistentLogin: (items) => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			window.location.replace(document.getElementsByName('mainFrame')[0].contentWindow.location.href);
		} else {
			if (!items.hideAUSHeader) {
				$('<iframe src="/top.htm" style="height: 85px; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw;" name="topFrame" scrolling="NO" noresize=""></iframe>').prependTo('body');
			}
		}
	},
	bigTitles: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
			$(frame).find('.title').css("font-size", '1.5em');
			$(frame).find('.submenulinktext2 ').css("font-size", '1.5em');
			$(frame).find('h2').css("font-size", '1.5em');
		} else {
			$('.title').css("font-size", '1.5em');
			$('.submenulinktext2 ').css("font-size", '1.5em');
			$('h2').css("font-size", '1.5em');
		}
	},
	hideAUSHeader: () => {
		return true;
	},
	thinFont: () => {
		let font = "'Yantramanav', sans-serif";
		let url = "https://fonts.googleapis.com/css?family=Yantramanav:300";
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
			$(frame).find('head').append(`<style>@import url('${url}');</style>`);
			$(frame).find('head').append(`<style>body * { font-family: ${font} !important;}</style>`);
			$(frame).find('span').css('font-size', '1em');
		} else {
			$('head').append(`<style>@import url('${url}');</style>`);
			$('head').append(`<style>body * { font-family: ${font} !important;}</style>`);
			$('span').css('font-size', '1em');
		}
	},
	biggerButtons: () => {
		$('input[type="submit"]').css('font-size', '18px');
	},
	autoLogin: () => {
		chrome.storage.sync.get(['username', 'password'], (result) => {
			if (document.getElementsByName('mainFrame')[0] !== undefined) {
				//I need absolute URLs for the new page load event to fire :/
				console.error('Auto login not supported without Persistent Login enabled.');
			} else {
				//Check if we are on the login page
				if ($('form[name="loginform"]').length) {
					//Check for login error message
					if ($('.pagebodydiv').text().indexOf("Invalid login information") >= 0) {
						alert("Invalid login settings detected. Please update your username and password in BannerPlus.");
					} else {
						$('input[id="UserID"]').val(result.username);
						$('input[name="PIN"]').val(result.password);
						$('input[type="submit"]').click();
					}
				}
			}
		})

	}
}

$(() => {
	chrome.storage.local.get(null, (items) => {
		let keys = Object.keys(items);
		keys.forEach((key) => {
			if (items[key] && tweaks[key]) {
				let func = tweaks[key];
				func(items);
			}
		})
	})
})