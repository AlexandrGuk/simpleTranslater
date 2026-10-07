const DEFAULT_SERVER_URL = 'https://translate.alxgk.37-252-1-182.sslip.io';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message || message.type !== 'translate') {
        return;
    }
    translate(message.text).then(sendResponse);
    return true;
});

async function translate(text) {
    const value = typeof text === 'string' ? text.trim() : '';
    if (!value) {
        return { ok: false, error: 'empty' };
    }

    const { serverUrl, token } = await chrome.storage.local.get({
        serverUrl: DEFAULT_SERVER_URL,
        token: '',
    });
    const url = String(serverUrl || '').trim();
    if (!url) {
        return { ok: false, error: 'no_server' };
    }

    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['X-Translate-Token'] = token;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({ text: value, target: 'ru' }),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok || !data || typeof data.translation !== 'string') {
            return { ok: false, error: (data && data.error) || 'translate_failed' };
        }
        return { ok: true, translation: data.translation };
    } catch (error) {
        return { ok: false, error: 'network' };
    }
}
