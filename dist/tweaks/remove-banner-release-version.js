'use strict';
function removeBannerReleaseVersion() { // eslint-disable-line no-unused-vars
	if (document.getElementsByName('mainFrame')[0] !== undefined) {
		const frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
		$(frame).find('.releasetext').remove();
	} else {
		$('.releasetext').remove();
	}
}