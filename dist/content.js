$(() => {
	chrome.storage.local.get(null, (items) => {
		const keys = Object.keys(items);
		keys.forEach((key) => {
			if (items[key] && window[key]) {
				const func = window[key];
				func(items);
			}
		});
	});

});