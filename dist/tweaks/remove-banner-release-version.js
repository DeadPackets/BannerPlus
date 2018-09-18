function removeBannerReleaseVersion() {
    if (document.getElementsByName('mainFrame')[0] !== undefined) {
        let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
        $(frame).find('.releasetext').remove();
    } else {
        $('.releasetext').remove();
    }
}