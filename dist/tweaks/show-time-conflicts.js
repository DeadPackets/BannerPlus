'use strict';
function showTimeConflicts() { // eslint-disable-line no-unused-vars
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		console.error('Highlighting classes not supported without Persistent Login');
	} else {
		if (document.location.href.indexOf('P_GetCrse') > -1 && $('caption').length !== 0) {
			const times = $('table caption ~ tbody tr td.dddefault:nth-child(10)');
			const url = 'https://banner.aus.edu/axp3b21h/owa/bwskcrse.P_CrseSchdDetl';
			const frame = document.createElement('iframe');
			frame.setAttribute('src', url);
			frame.style.width = '0';
			frame.style.height = '0';
			document.body.appendChild(frame);
			frame.addEventListener('load', function () {
				$(this.contentWindow.document).find('table:nth-child(4)').children('tbody').find('tr').each((i, item) => {
					if (i !== 0) {
						const info = {
							crn: $(item).find('td:nth-child(1)').text(),
							course: $(item).find('td:nth-child(2)').text(),
							title: $(item).find('td:nth-child(3)').text(),
							startDate: $(item).find('td:nth-child(7)').text(),
							endDate: $(item).find('td:nth-child(8)').text(),
							days: $(item).find('td:nth-child(9)').text(),
							times: $(item).find('td:nth-child(10)').text(),
							location: $(item).find('td:nth-child(11)').text(),
							instructor: $(item).find('td:nth-child(12)').text()
						};

						if (info.crn.length >= 4) {
							times.each((i, item) => {
								const days = $(item).parent().find('td.dddefault:nth-child(9)').text().split('');

								days.forEach((day) => {
									if (info.days.indexOf(day) > -1) {
										const registeredStart = new Date(info.startDate + ' ' + $(item).text().split('-')[0]).getTime();
										const registeredEnd = new Date(info.startDate + ' ' + $(item).text().split('-')[1]).getTime();
										const courseStart = new Date(info.startDate + ' ' + info.times.split(' - ')[0]).getTime();
										const courseEnd = new Date(info.startDate + ' ' + info.times.split(' - ')[1]).getTime();
										if ((courseStart >= registeredStart && courseStart <= registeredEnd) || (courseEnd >= registeredStart && courseEnd <= registeredEnd)) {
											const text = $(item).parent().find('td.dddefault:nth-child(1)').text();
											if (!(text.length < 4 && text !== 'C' && text !== 'SR')) {
												$(item).parent().css('background-color', '#FEEFB3');
												$(item).append(`\n<br />[CONFLICT WITH ${info.title} (${info.crn}/${info.course}) || ${info.times}]`);
											}
										}
									}
								});
							});
						}
					}
				});
				$(this).hide();
			});
		}
	}
}