function hideBannerWarning() {
    if (document.getElementsByName('mainFrame')[0] !== undefined) {
        let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
        let text = $(frame).find('.infotext').text();
        if (text.indexOf('The use of software or tools that constantly refresh') > -1) {
            $(frame).find('.infotext').parent().parent().remove();
        }
    } else {
        let text = $('.infotext').text();
        if (text.indexOf('The use of software or tools that constantly refresh') > -1) {
            $('.infotext').parent().parent().remove();
        }
    }
}