function highlightClosedClasses() {
    if (document.getElementsByName('mainFrame')[0] !== undefined) {
        console.error('Highlighting classes not supported without Persistent Login');
    } else {
        if (document.location.href.indexOf('P_GetCrse') > -1) {
            $('abbr[title="Closed"]').parent().parent().css('background-color', 'rgba(255, 0, 0, 0.4)');
        }
    }
}