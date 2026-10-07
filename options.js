const DEFAULT_SERVER_URL = 'https://alxgk.site/translate';

document.addEventListener('DOMContentLoaded', async () => {
    const { serverUrl, token } = await chrome.storage.local.get({
        serverUrl: DEFAULT_SERVER_URL,
        token: '',
    });
    document.getElementById('serverUrl').value = serverUrl;
    document.getElementById('token').value = token;
});

document.getElementById('save').addEventListener('click', async () => {
    const serverUrl = document.getElementById('serverUrl').value.trim();
    const token = document.getElementById('token').value.trim();
    await chrome.storage.local.set({ serverUrl, token });
    const status = document.getElementById('status');
    status.textContent = 'Сохранено';
});
