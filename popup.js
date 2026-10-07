function attachButtonEvent() {
    document.getElementById('translate').addEventListener('click', getTranslate);
    document.getElementById('options').addEventListener('click', (event) => {
        event.preventDefault();
        chrome.runtime.openOptionsPage();
    });
}

async function getTranslate() {
    const text = document.querySelector('textarea#from').value;
    const result = document.querySelector('textarea#result');
    result.value = 'Загрузка...';
    const response = await chrome.runtime.sendMessage({ type: 'translate', text });
    if (!response || !response.ok) {
        result.value = response && response.error === 'no_server'
            ? 'Укажите адрес сервера в настройках'
            : 'Не удалось перевести';
        return;
    }
    result.value = response.translation;
}

document.addEventListener('DOMContentLoaded', attachButtonEvent);
