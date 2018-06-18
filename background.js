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

// chrome.webRequest.onBeforeRequest.addListener(
// 	function (details) {
// 		console.log(options);
// 		return {
// 			cancel: options.blockAUSImages
// 		};
// 	}, {
// 		urls: ["*://banner.aus.edu/*"],
// 		types: ["image"]
// 	}, ["blocking"]);

chrome.storage.onChanged.addListener((changes) => {
	let keys = Object.keys(changes);
	keys.forEach((key) => {
		options[key] = changes[key].newValue;
	})
})

let crnInfo = chrome.contextMenus.create({
	title: "Get Information About This CRN",
	contexts: ["selection"]
});

let termCodes = [{
		name: "Fall 2018",
		code: 201910
	},
	{
		name: "Summer 2018",
		code: 201830
	},
	{
		name: "Summer II 2018",
		code: 201840
	}
]

termCodes.forEach((item) => {
	chrome.contextMenus.create({
		title: item.name,
		contexts: ["selection"],
		parentId: crnInfo,
		onclick: (info, tab) => {
			chrome.tabs.create({
				url: `https://banner.aus.edu/axp3b21h/owa/bwckschd.p_disp_detail_sched?term_in=${item.code}&crn_in=${info.selectionText}`
			})
		}
	})
})

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.signal === 'evadeBlocking') {
		chrome.cookies.getAll({domain: "banner.aus.edu"}, function(cookies) {
				for (var i=0; i < cookies.length; i++) {
					chrome.cookies.remove({url: "https://banner.aus.edu" + cookies[i].path, name: cookies[i].name});
				}

				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
				});
		})
	}
});