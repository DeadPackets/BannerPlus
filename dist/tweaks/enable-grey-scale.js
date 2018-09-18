function enableGreyScale() {
    if (document.getElementsByName('mainFrame')[0] !== undefined) {
        console.error('Gray Scale is not supported without Persistent Login');
    } else {
        $('body').css('filter', 'grayscale(100%)');
    }
}