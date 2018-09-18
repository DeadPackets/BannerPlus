function biggerCheckboxes() {
    if (document.getElementsByName('mainFrame')[0] !== undefined) {
        let frame = $(document.getElementsByName('mainFrame')[0].contentWindow.document);
        $(frame).find('input[type="checkbox"]').css('transform', 'scale(2)')
    } else {
        $('input[type="checkbox"]').css('transform', 'scale(2)');
    }
}