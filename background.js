/* eslint-disable */
chrome.storage.local.get(['hideAUSHeader'], (result) => {
	chrome.webRequest.onBeforeRequest.addListener(
		function (details) {
			return {
				cancel: true
			};
		}, {
			urls: ["*://banner.aus.edu/top.htm"]
		}, ["blocking"]);
})