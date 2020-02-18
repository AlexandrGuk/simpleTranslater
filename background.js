chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    let translatedResponse;
    translatedResponse = await fetch("http://localhost:3000", {
        "body": request.text,
        "method": "POST"
    }).then(resp => resp.ok ? resp.json() : resp.text());
    if ( translatedResponse && translatedResponse !== "ERROR" && Array.isArray(translatedResponse) ) {
         chrome.tabs.sendMessage(sender.tab.id, translatedResponse.join(" | "), ()=>null);
    }
});