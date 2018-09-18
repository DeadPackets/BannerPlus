function boldFont() {
	const font = '\'Yantramanav\', sans-serif';
	const url = 'https://fonts.googleapis.com/css?family=Yantramanav:900';
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		const frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
		$(frame).find('head').append(`<style>@import url('${url}');</style>`);
		$(frame).find('head').append(`<style>body * { font-family: ${font} !important;}</style>`);
		$(frame).find('.title').css('font-size', '1.4em');
		$(frame).find('span').css('font-size', '1em');
	} else {
		$('head').append(`<style>@import url('${url}');</style>`);
		$('head').append(`<style>body * { font-family: ${font} !important;}</style>`);
		$('.title').css('font-size', '1.4em');
		$('span').css('font-size', '1em');
	}
}