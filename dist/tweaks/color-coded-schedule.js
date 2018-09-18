function colorCodedSchedule() {
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		console.warn('I am not bothered to support color coded schedule without persistent login enabled.');
	} else {
		if (document.location.href.indexOf('P_CrseSchd') > -1) {
			const colors = [
				{
					color: '#fbaa90'
				},
				{
					color: '#e9cc96'
				},
				{
					color: '#acd17b'
				},
				{
					color: '#c9c9ff'
				},
				{
					color: '#b9c5ec'
				},
				{
					color: '#e6f3e3'
				},
				{
					color: '#ffdfcb'
				},
				{
					color: '#ffcd55'
				},
				{
					color: '#ffbdbd'
				}
			];

			const courseIDs = [];
			let counter = 0;
			$('td[rowspan]').each((i, item) => {
				const courseID = $(item).text();
				if (courseIDs.indexOf(courseID) === -1) {
					courseIDs.push(courseID);
					$(`td[rowspan]:contains(${courseID})`).each((i2, courseItem) => {
						$(courseItem).css('background-color', colors[counter].color);
						if (colors[counter].textColor) {
							$(courseItem).find('a').css('color', colors[counter].textColor);
						}
					});
					counter++;
				}
			});
		}
	}
}