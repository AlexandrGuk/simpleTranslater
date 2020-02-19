console.log("hello, im simple transator!");
let TRANSLATE_DIV;
const BUTTON_DIV = createDiv();

document.addEventListener("mouseup", getSelectedText);
document.addEventListener("dblclick", getSelectedText);
document.addEventListener("click", hideTranslate);

function getSelectedText(event) {
    if ( event.target === BUTTON_DIV || event.target === TRANSLATE_DIV ) {
        cancelDefaultAction(event);
        return;
    }
    const selection = window.getSelection();
    if ( selection && selection.toString() ) {
        BUTTON_DIV.style.left = event.pageX + "px";
        BUTTON_DIV.style.top = event.pageY + "px";
        BUTTON_DIV.style.display = "block";
        BUTTON_DIV.dataset.text = selection.toString();

    }
}

getBrowser().runtime.onMessage.addListener((request, sender, sendResponse) => {
    TRANSLATE_DIV.textContent = request;
    return null;
});

function createDiv() {
    const div = document.createElement("div");
    const tooltip = document.createElement("div");

    tooltip.style.position = "absolute";
    tooltip.style.display = "none";
    tooltip.style.backgroundColor = "#504416ff";
    tooltip.style.color = "#ffdd55ff";
    tooltip.style.padding = "5px";
    tooltip.style.border = "solid";
    tooltip.style.borderColor = "black";
    tooltip.style.zIndex = "9999999";
    tooltip.style.width = "max-content";
    tooltip.style.maxWidth = "250px";

    TRANSLATE_DIV = div.appendChild(tooltip);

    div.id = "simplyTranslateSpan";
    div.style.width = "24px";
    div.style.height = "24px";
    div.style.position = "absolute";
    div.style.display = "none";
    div.style.cursor = "pointer";
    div.style.backgroundImage = `url(${getBrowser().runtime.getURL("icons/icon48.png")})`;
    div.style.backgroundSize = `cover`;
    div.style.zIndex = "9999999";
    div.addEventListener("mousedown", getTranslate);

    return document.body.appendChild(div);
}

function getTranslate(event) {
    cancelDefaultAction(event);
    const text = BUTTON_DIV.dataset.text;
    if ( text ) {
        TRANSLATE_DIV.textContent = "Загрузка...";
        TRANSLATE_DIV.style.display = "block";
        TRANSLATE_DIV.style.left = "-100%";
        TRANSLATE_DIV.style.bottom = "26px";
        getBrowser().runtime.sendMessage({text: text});
    }
}

function hideTranslate(event) {
    if ( event.target === BUTTON_DIV || event.target === TRANSLATE_DIV ) {
        cancelDefaultAction(event);
        return;
    }
    BUTTON_DIV.style.display = "none";
    TRANSLATE_DIV.style.display = "none";

}

function cancelDefaultAction(event) {
    event.preventDefault();
    event.stopPropagation();
}

function getBrowser() {
    if ( typeof browser === "undefined"  ) {
        return chrome;
    } else {
        return browser;
    }
}