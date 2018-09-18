function makeBannerQuiet() {
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		const frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
		$(frame).find('html').css('text-transform', 'lowercase');
		$(frame).find('td').css('text-transform', 'lowercase');
		$(frame).find('input').css('text-transform', 'lowercase');
		$(frame).find('option').css('text-transform', 'lowercase');
	} else {
		$('html').css('text-transform', 'lowercase');
		$('td').css('text-transform', 'lowercase');
		$('input').css('text-transform', 'lowercase');
		$('option').css('text-transform', 'lowercase');
	}
}