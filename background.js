chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const translatedResponse = await fetch("http://localhost:3000", {
        "body": request.text,
        "method": "POST"
    }).then(resp => resp.ok ? resp.json() : null).catch(null);
    if ( translatedResponse ) {
        chrome.tabs.sendMessage(sender.tab.id, translatedResponse, () => null);
    }
});