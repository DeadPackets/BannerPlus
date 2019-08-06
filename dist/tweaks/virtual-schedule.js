'use strict';
function virtualSchedule() {
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		console.error('Show Holds is only enabled with Persistent Login');
	} else {
		if (document.location.href.indexOf('P_GetCrse') >= 0) {
			$('tbody > tr:has(th.ddheader)').append('<th class="ddheader" scope="col">Add To BannerPlus</th>');
			$('tbody > tr:has(td.dddefault)').each((i, item) => { $(item).append('<td class="dddefault"></td>'); });
		}
	}
}