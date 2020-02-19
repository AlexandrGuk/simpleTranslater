chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const translatedResponse = await fetch("https://boiling-dawn-39443.herokuapp.com", {
        "body": request.text,
        "method": "POST"
    }).then(resp => resp.ok ? resp.json() : null).catch(null);
    if ( translatedResponse ) {
        chrome.tabs.sendMessage(sender.tab.id, translatedResponse, () => null);
    }
});