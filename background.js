function getBrowser() {
    if ( typeof browser === "undefined"  ) {
        return chrome;
    } else {
        return browser;
    }
}

getBrowser().runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const translatedResponse = await fetch("https://boiling-dawn-39443.herokuapp.com", {
        "body": request.text,
        "method": "POST"
    }).then(resp => resp.ok ? resp.json() : null).catch(null);
    if ( translatedResponse ) {
        getBrowser().tabs.sendMessage(sender.tab.id, translatedResponse, () => null);
    }
});

