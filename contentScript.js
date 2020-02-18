console.log("hello, im simple transator!");
document.addEventListener("mouseup", getSelectedText);

function getSelectedText(event) {
    let text = "";
    if ( window.getSelection ) {
        text = window.getSelection().toString();
        if ( text ) {
            chrome.runtime.sendMessage({text: text});
        }
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    return null;
});