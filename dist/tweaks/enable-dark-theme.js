function enableDarkTheme() {
    if (document.getElementsByName('mainFrame')[0] !== undefined) {
        console.error('Dark Theme is not supported without Persistent Login');
    } else {
        $('body').css('background-color', '#0C0F0E');
        $('body').css('filter', 'grayscale(100%) invert(100%) brightness(80%)');
    }
}