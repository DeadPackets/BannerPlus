function blockAUSImages() {
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		const frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
		$(frame).find('img').attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
	} else {
		$('img').attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
	}

	if (document.getElementsByName('topFrame')[0] !== undefined) {
		const frame = $(document.getElementsByName('topFrame')[0].contentWindow.document);
		$(frame).find('img').attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
	}
}