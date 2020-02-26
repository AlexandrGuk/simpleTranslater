function getBrowser() {
    if ( typeof browser === "undefined"  ) {
        return chrome;
    } else {
        return browser;
    }
}

getBrowser().runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const translatedResponse = await fetch("http://5.61.33.30:5000", {
        "body": request.text,
        "method": "POST"
    }).then(resp => resp.ok ? resp.json() : null).catch(null);
    if ( translatedResponse ) {
        getBrowser().tabs.sendMessage(sender.tab.id, translatedResponse, () => null);
    }
});