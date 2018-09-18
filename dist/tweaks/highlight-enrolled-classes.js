function highlightEnrolledClasses() {
    if (document.getElementsByName('mainFrame')[0] !== undefined) {
        console.error('Highlighting classes not supported without Persistent Login');
    } else {
        if (document.location.href.indexOf('P_GetCrse') > -1) {
            $('table caption ~ tbody tr td.dddefault:nth-child(1)').each((i, item) => {
                let text = $(item).text();
                if (text.length < 4 && text !== 'C' && text !== 'SR') {
                    $(item).parent().css('background-color', '#a0a0a0');
                }
            })
        }
    }
}