function attachControls() {
    const provider = document.getElementById('provider');
    chrome.storage.local.get({ provider: 'google' }, (stored) => {
        if (provider.querySelector(`option[value="${stored.provider}"]`)) {
            provider.value = stored.provider;
        }
    });
    provider.addEventListener('change', () => {
        chrome.storage.local.set({ provider: provider.value });
    });
    document.getElementById('translate').addEventListener('click', getTranslate);
}

async function getTranslate() {
    const text = document.querySelector('textarea#from').value;
    const provider = document.getElementById('provider').value;
    const result = document.querySelector('textarea#result');
    await chrome.storage.local.set({ provider });
    result.value = 'Загрузка...';
    const response = await chrome.runtime.sendMessage({ type: 'translate', text, provider });
    result.value = response && response.ok ? response.translation : 'Не удалось перевести';
}

document.addEventListener('DOMContentLoaded', attachControls);
