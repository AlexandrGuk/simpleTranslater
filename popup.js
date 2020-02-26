function attachButtonEvent() {
    const button = document.getElementById("translate");
    button.addEventListener("click", getTranslate);
}

async function getTranslate() {
    const text = document.querySelector("textarea#from").value;
    const translatedResponse = await fetch("http://5.61.33.30:5000", {
        "body": text,
        "method": "POST"
    }).then(resp => resp.ok ? resp.json() : null).catch(null);
    if ( translatedResponse ) {
        document.querySelector("textarea#result").value = translatedResponse;
    }
}

document.addEventListener("DOMContentLoaded", attachButtonEvent);