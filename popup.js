function attachButtonEvent() {
    console.log("attach");
    const button = document.getElementById("translate");
    button.addEventListener("click", getTranslate);
}

async function getTranslate() {
    const text = document.querySelector("textarea#from").value;
    const translatedResponse = await fetch("http://localhost:3000", {
        "body": text,
        "method": "POST"
    }).then(resp => resp.ok ? resp.json() : null).catch(null);
    if ( translatedResponse ) {
        document.querySelector("textarea#result").value = translatedResponse;
    }
}

document.addEventListener("DOMContentLoaded", attachButtonEvent);