function highlightOpenClasses() {
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		console.error('Highlighting classes not supported without Persistent Login');
	} else {
		if (document.location.href.indexOf('P_GetCrse') > -1) {
			$('input[type="checkbox"]').parent().parent().css('background-color', 'rgba(0, 255, 0, 0.4)');
			$('abbr[title="Student Restrictions"]').parent().parent().css('background-color', 'rgba(0, 255, 0, 0.4)');
		}
	}
}