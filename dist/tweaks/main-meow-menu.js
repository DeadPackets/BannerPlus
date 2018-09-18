function mainMeowMenu() {
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		const frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
		$(frame).find('img[alt="aus"]').each((i, item) => {
			$(item).attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
			$(item).attr('src', 'https://cataas.com/cat/cute?he=80&wi=80&id=' + Math.random());
		});
	} else {
		$('img[alt="aus"]').each((i, item) => {
			$(item).attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
			$(item).attr('src', 'https://cataas.com/cat/cute?he=80&wi=80&id=' + Math.random());
		});
	}
}