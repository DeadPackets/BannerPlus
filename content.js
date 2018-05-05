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
						console.log("No holds found!")
						return true;
					} else {
						if ($(this.contentWindow.document)[0].body.innerHTML.indexOf('User Login') > -1) {
							console.warn('You are not logged in for View Holds to work!');
						} else {
							console.log(frame.contentWindow.document);
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
			//300000
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
				$('abbr[title="Student Restrictions"]').parent().parent().css('background-color', 'rgba(0, 255, 0, 0.4)');
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
	},
	mainMeowMenu: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
			$(frame).find('img[alt="aus"]').each((i, item) => {
				$(item).attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
				$(item).attr('src', 'https://cataas.com/cat/cute?he=80&wi=80&id=' + Math.random())
			})
		} else {
			$('img[alt="aus"]').each((i, item) => {
				$(item).attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
				$(item).attr('src', 'https://cataas.com/cat/cute?he=80&wi=80&id=' + Math.random())
			})
		}
	},
	emojiGrades: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			console.log('Emoji Grades not supported without Persistent Login');
		} else {
			if (document.location.href.indexOf('P_ViewGrde') > -1) {
				$('tbody td:nth-child(7)').each((i, item) => {
					let grade = $(item).text()
					let emoji = '';
					switch (grade) {
						case 'A':
							emoji = 'fire';
							break;
						case 'A-':
							emoji = '--1';
							break;
						case 'B+':
							emoji = 'blush';
							break;
						case 'B':
							emoji = 'smiley';
							break;
						case 'B-':
							emoji = 'dissapointed';
							break;
						case 'C+':
							emoji = 'slightly_smiling_face';
							break;
						case 'C':
							emoji = 'upside_down_face';
							break;
						case 'C-':
							emoji = 'joy';
							break;
						case 'D':
							emoji = 'skull';
							break;
						case 'F':
							emoji = '100';
							break;
					}

					$(item).append(`<i style="float: right;" class="em em-${emoji}"></i>`)
				})

				$('tr td:nth-child(6) .rightaligntext').each((i, item) => {
					let gpa = parseFloat($(item).text());
					console.log(gpa);

					if (gpa == 4.0) {
						emoji = 'fire';
					} else if (gpa >= 3.5 && gpa <= 3.99) {
						emoji = 'sunglasses'
					} else if (gpa >= 3.0 && gpa <= 3.49) {
						emoji = 'smile'
					} else if (gpa >= 2.5 && gpa <= 2.99) {
						emoji = 'expressionless'
					} else if (gpa >= 2.0 && gpa <= 2.49) {
						emoji = 'upside_down_face'
					} else if (gpa >= 1.5 && gpa <= 1.99) {
						emoji = 'joy'
					} else if (gpa >= 1.0) {
						emoji = 'skull'
					} else {
						emoji = '100'
					}

					$(item).append(`<i style="float: right;" class="em em-${emoji}"></i>`)
				})
			}
		}
	},
	allowDownloadSchedule: () => {
		if (document.getElementsByName('mainFrame')[0] !== undefined) {
			console.error('Downloading the calendar is not supported without persistent login')
		} else {
			if (document.location.href.indexOf('P_CrseSchdDetl') > -1) {
				$('.pagebodydiv').first().append('<button class="downloadICS button">Download ICS File</button>')
				$('.button').attr('style', 'background-color: #990000; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px');
				$('.downloadICS').click(() => {
					let cal = `BEGIN:VCALENDAR\nPRODID:Calendar\nVERSION:2.0\n`;
					let counter = 0;

					//Thanks stackoverflow
					function pad(i) {
						return i < 10 ? `0${i}` : `${i}`;
					}

					function formatDateTime(date) {
						const year = date.getUTCFullYear();
						const month = pad(date.getUTCMonth() + 1);
						const day = pad(date.getUTCDate());
						const hour = pad(date.getUTCHours());
						const minute = pad(date.getUTCMinutes());
						const second = pad(date.getUTCSeconds());
						return `${year}${month}${day}T${hour}${minute}${second}Z`;
					  }

					$('table:nth-child(4)').children('tbody').find('tr').each((i, item) => {
						if (i !== 0) {
							let info = {
								crn: $(item).find('td:nth-child(1)').text(),
								course: $(item).find('td:nth-child(2)').text(),
								title: $(item).find('td:nth-child(3)').text(),
								startDate: $(item).find('td:nth-child(7)').text(),
								endDate: $(item).find('td:nth-child(8)').text(),
								days: $(item).find('td:nth-child(9)').text(),
								times: $(item).find('td:nth-child(10)').text(),
								location: $(item).find('td:nth-child(11)').text(),
								instructor: $(item).find('td:nth-child(12)').text()
							}

							if (info.crn.length >= 4) {
								info.days.split('').forEach((item) => {
									let day;
									switch (item) {
										case 'T':
											day = "Tuesday";
											break;
										case 'R':
											day = "Thursday";
											break;
										case 'U':
											day = "Sunday";
											break;
										case 'M':
											day = "Monday";
											break;
										case 'W':
											day = "Wednesday";
											break;
									}
									cal = cal + `BEGIN:VEVENT\nUID:${counter}@default\nClass:PUBLIC\nDESCRIPTION:${info.title} with ${info.instructor}\nDTSTAMP;VALUE=DATE-TIME:${formatDateTime(new Date())}\nDTSTART:${formatDateTime(new Date(moment(new Date(info.startDate + " " + info.times.split(' - ')[0])).day(day).format()))}\nDTEND:${formatDateTime(new Date(moment(new Date(info.startDate + " " + info.times.split(' - ')[1])).day(day).format()))}\nRRULE:FREQ=WEEKLY;INTERVAL=1;UNTIL=${formatDateTime(new Date(moment(new Date(info.endDate + " " + info.times.split(' - ')[1])).day(day).format()))}\nLOCATION:${info.location}\nSUMMARY;LANGUAGE=en-us:${info.course.substring(0, info.course.length - 3)}\nTRANSP:TRANSPARENT\nEND:VEVENT\n`;
									counter++;
								})
							}
						}
					})
					cal = cal + `END:VCALENDAR`;
					let blob = new Blob([cal], {
						type: 'text/calendar'
					})
					FileSaver.saveAs(blob, 'calendar.ics');
				})
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