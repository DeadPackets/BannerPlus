function persistentLogin() {
    if (document.getElementsByName('mainFrame')[0] !== undefined) {
        window.location.replace(document.getElementsByName('mainFrame')[0].contentWindow.location.href);
    } else {
        if (!items.hideAUSHeader) {
            $('<iframe src="/top.htm" style="height: 85px; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw;" name="topFrame" scrolling="NO" noresize=""></iframe>').prependTo('body');
            if (items.blockAUSImages) {
                setTimeout(() => {
                    let frame = $(document.getElementsByName('topFrame')[0].contentWindow.document);
                    $(frame).find('img').attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
                }, 350)
            }
        }
    }
}