/* eslint-disable */

let options = {}

chrome.storage.local.get(['hideAUSHeader', 'blockAUSImages'], (result) => {
	options.hideAUSHeader = result.hideAUSHeader;
	options.blockAUSImages = result.blockAUSImages;
})

chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
		return {
			cancel: options.hideAUSHeader
		};
	}, {
		urls: ["*://banner.aus.edu/top.htm"]
	}, ["blocking"]);

chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
		console.log(options);
		return {
			cancel: options.blockAUSImages
		};
	}, {
		urls: ["*://banner.aus.edu/*"],
		types: ["image"]
	}, ["blocking"]);

chrome.storage.onChanged.addListener((changes) => {
	let keys = Object.keys(changes);

	keys.forEach((key) => {
		options[key] = changes[key].newValue;
	})

})
