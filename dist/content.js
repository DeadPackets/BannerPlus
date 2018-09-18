/* eslint-disable */

$(() => {
	chrome.storage.local.get(null, (items) => {
		let keys = Object.keys(items);
		keys.forEach((key) => {
			if (items[key] && window[key]) {
				let func = window[key];
				func(items);
			}
		})
	})

})