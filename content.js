/* eslint-disable */

const tweaks = {
	persistentLogin: (items) => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			window.location.replace(document.getElementsByName('mainFrame')[0].contentWindow.location.href);
		} else {
			if (!items.hideAUSHeader) {
				$('<iframe src="/top.htm" style="height: 85px; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw;" name="topFrame" scrolling="NO" noresize=""></iframe>').prependTo('body');
				if (items.blockAUSImages) {
					setTimeout(() => {
						let frame = $(document.getElementsByName('topFrame')[0].contentWindow.document);
						$(frame).find('img').attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
					}, 350)
				}
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
	boldFont: () => {
		let font = "'Yantramanav', sans-serif";
		let url = "https://fonts.googleapis.com/css?family=Yantramanav:900";
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
			$(frame).find('head').append(`<style>@import url('${url}');</style>`);
			$(frame).find('head').append(`<style>body * { font-family: ${font} !important;}</style>`);
			$(frame).find('.title').css('font-size', '1.4em');
			$(frame).find('span').css('font-size', '1em');
		} else {
			$('head').append(`<style>@import url('${url}');</style>`);
			$('head').append(`<style>body * { font-family: ${font} !important;}</style>`);
			$('.title').css('font-size', '1.4em');
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
	},
	showHolds: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			console.error('Show Holds is only enabled with Persistent Login');
		} else {
			if (document.location.href.indexOf('P_ViewHold') < 0) {
				let url = 'https://banner.aus.edu/axp3b21h/owa/bwskoacc.P_ViewHold';
				let frame = document.createElement("iframe");
				frame.setAttribute("src", url);
				frame.style.width = "0";
				frame.style.height = "0";
				document.body.appendChild(frame);
				frame.addEventListener("load", function () {
					let text = $(this.contentWindow.document).find('.warningtext').text()
					if (text.indexOf('No holds exist') > -1) {
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
				});
			}
		}
	},
	blockAUSImages: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
			$(frame).find('img').attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
		} else {
			$('img').attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
		}

		if (document.getElementsByName('topFrame')[0] !== undefined) {
			let frame = $(document.getElementsByName('topFrame')[0].contentWindow.document);
			$(frame).find('img').attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
		}
	},
	disableAutoRefresh: () => {
		return true;
	},
	preventInactive: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			console.error('Prevent Inactive Login is not supported without Persistent Login enabled.');
		} else {
			setTimeout(() => {
				location.reload();
			}, 300000)
		}
	},
	removeBannerReleaseVersion: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
			$(frame).find('.releasetext').remove();
		} else {
			$('.releasetext').remove();
		}
	},
	enableDarkTheme: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			console.error('Dark Theme is not supported without Persistent Login');
		} else {
			$('body').css('background-color', '#0C0F0E');
			$('body').css('filter', 'grayscale(100%) invert(100%) brightness(80%)');
		}
	},
	enableGrayScale: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			console.error('Gray Scale is not supported without Persistent Login');
		} else {
			$('body').css('filter', 'grayscale(100%)');
		}
	},
	makeBannerScream: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
			$(frame).find('html').css('text-transform', 'uppercase');
			$(frame).find('td').css('text-transform', 'uppercase');
			$(frame).find('input').css('text-transform', 'uppercase');
			$(frame).find('option').css('text-transform', 'uppercase');
		} else {
			$('html').css('text-transform', 'uppercase');
			$('td').css('text-transform', 'uppercase');
			$('input').css('text-transform', 'uppercase');
			$('option').css('text-transform', 'uppercase');
		}
	},
	makeBannerQuiet: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
			$(frame).find('html').css('text-transform', 'lowercase');
			$(frame).find('td').css('text-transform', 'lowercase');
			$(frame).find('input').css('text-transform', 'lowercase');
			$(frame).find('option').css('text-transform', 'lowercase');
		} else {
			$('html').css('text-transform', 'lowercase');
			$('td').css('text-transform', 'lowercase');
			$('input').css('text-transform', 'lowercase');
			$('option').css('text-transform', 'lowercase');
		}
	},
	highlightClosedClasses: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			console.error('Highlighting classes not supported without Persistent Login');
		} else {
			if (document.location.href.indexOf('P_GetCrse') > -1) {
				$('abbr[title="Closed"]').parent().parent().css('background-color', 'rgba(255, 0, 0, 0.4)');
			}
		}
	},
	highlightOpenClasses: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			console.error('Highlighting classes not supported without Persistent Login');
		} else {
			if (document.location.href.indexOf('P_GetCrse') > -1) {
				$('input[type="checkbox"]').parent().parent().css('background-color', 'rgba(0, 255, 0, 0.4)');
			}
		}
	},
	biggerCheckboxes: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
			$(frame).find('input[type="checkbox"]').css('transform', 'scale(2)')
		} else {
			$('input[type="checkbox"]').css('transform', 'scale(2)');
		}
	},
	hideBannerWarning: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
			let text = $(frame).find('.infotext').text();
			if (text.indexOf('The use of software or tools that constantly refresh') > -1) {
				$(frame).find('.infotext').parent().parent().remove();
			}
		} else {
			let text = $('.infotext').text();
			if (text.indexOf('The use of software or tools that constantly refresh') > -1) {
				$('.infotext').parent().parent().remove();
			}
		}
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