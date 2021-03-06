'use strict';
const options = {};

chrome.storage.local.get(['hideAUSHeader', 'blockAUSImages'], (result) => {
	options.hideAUSHeader = result.hideAUSHeader;
});

chrome.webRequest.onBeforeRequest.addListener(
	() => {
		return {
			cancel: options.hideAUSHeader
		};
	}, {
		urls: ['*://banner.aus.edu/top.htm']
	}, ['blocking']);

chrome.storage.onChanged.addListener((changes) => {
	const keys = Object.keys(changes);
	keys.forEach((key) => {
		options[key] = changes[key].newValue;
	});
});

//TODO: Fix
// const crnInfo = chrome.contextMenus.create({
// 	title: 'Get Information About This CRN',
// 	contexts: ['selection']
// });

// const termCodes = [{
// 	name: 'Fall 2018',
// 	code: 201910
// },
// {
// 	name: 'Summer 2018',
// 	code: 201830
// },
// {
// 	name: 'Summer II 2018',
// 	code: 201840
// }
// ];

// termCodes.forEach((item) => {
// 	chrome.contextMenus.create({
// 		title: item.name,
// 		contexts: ['selection'],
// 		parentId: crnInfo,
// 		onclick: (info) => {
// 			chrome.tabs.create({
// 				url: `https://banner.aus.edu/axp3b21h/owa/bwckschd.p_disp_detail_sched?term_in=${item.code}&crn_in=${info.selectionText}`
// 			});
// 		}
// 	});
// });

chrome.runtime.onMessage.addListener((msg) => {
	if (msg.signal === 'evadeBlocking') {
		chrome.cookies.getAll({domain: 'banner.aus.edu'}, (cookies) => {
			for (let i=0; i < cookies.length; i++) {
				chrome.cookies.remove({url: 'https://banner.aus.edu' + cookies[i].path, name: cookies[i].name});
			}

			chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
				chrome.tabs.update(tabs[0].id, {url: 'https://banner.aus.edu/axp3b21h/owa/twbkwbis.P_GenMenu'});
			});
		});
	}
});