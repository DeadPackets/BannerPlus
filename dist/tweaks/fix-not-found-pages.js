function fixNotFoundPages() {
    if (document.getElementsByName('mainFrame')[0] !== undefined) {
        console.warn('No support without persistent login.');
    } else {
        if ($('h1:contains(Not Found)').length === 1) {
            window.history.back();
        }
    }
}