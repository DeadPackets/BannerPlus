function removeBannerReleaseVersion() {
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		const frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
		$(frame).find('.releasetext').remove();
	} else {
		$('.releasetext').remove();
	}
}