const PREMIUM_URL = 'https://alxgk.site/translate/premium';
const PROVIDERS = new Set(['google', 'yandex', 'premium']);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message || message.type !== 'translate') {
        return;
    }
    translate(message.text, message.provider).then(sendResponse);
    return true;
});

async function translate(text, requestedProvider) {
    const value = typeof text === 'string' ? text.trim() : '';
    if (!value) {
        return { ok: false, error: 'empty' };
    }
    const provider = await resolveProvider(requestedProvider);
    try {
        if (provider === 'yandex') {
            return await translateYandex(value);
        }
        if (provider === 'premium') {
            return await translatePremium(value);
        }
        return await translateGoogle(value);
    } catch (error) {
        return { ok: false, error: 'network' };
    }
}

async function resolveProvider(requestedProvider) {
    if (PROVIDERS.has(requestedProvider)) {
        return requestedProvider;
    }
    const { provider } = await chrome.storage.local.get({ provider: 'google' });
    return PROVIDERS.has(provider) ? provider : 'google';
}

async function translateGoogle(text) {
    const url = new URL('https://translate.googleapis.com/translate_a/single');
    url.searchParams.set('client', 'gtx');
    url.searchParams.set('sl', 'auto');
    url.searchParams.set('tl', 'ru');
    url.searchParams.set('dt', 't');
    url.searchParams.set('dj', '1');
    url.searchParams.set('q', text);
    const response = await fetch(url);
    const data = await response.json().catch(() => null);
    const translation = data && Array.isArray(data.sentences)
        ? data.sentences.map((sentence) => sentence.trans || '').join('')
        : '';
    if (!response.ok || !translation) {
        return { ok: false, error: 'translate_failed' };
    }
    return { ok: true, translation, provider: 'google' };
}

async function translateYandex(text) {
    const detected = await yandexCall('detect', text);
    const source = detected && detected.lang;
    if (!source) {
        return { ok: false, error: 'translate_failed' };
    }
    if (source === 'ru') {
        return { ok: true, translation: text, provider: 'yandex' };
    }
    const data = await yandexCall('translate', text, `${source}-ru`);
    const translation = data && Array.isArray(data.text) ? data.text.join('') : '';
    if (!translation) {
        return { ok: false, error: 'translate_failed' };
    }
    return { ok: true, translation, provider: 'yandex' };
}

async function yandexCall(method, text, lang) {
    const url = new URL(method, 'https://browser.translate.yandex.net/api/v1/tr.json/');
    url.searchParams.set('srv', 'browser_video_translation');
    url.searchParams.set('text', text);
    if (lang) {
        url.searchParams.set('lang', lang);
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'maxRetryCount=2&fetchAbortTimeout=500',
    });
    if (!response.ok) {
        return null;
    }
    return response.json().catch(() => null);
}

async function translatePremium(text) {
    const response = await fetch(PREMIUM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, target: 'ru' }),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data || typeof data.translation !== 'string') {
        return { ok: false, error: 'translate_failed' };
    }
    return { ok: true, translation: data.translation, provider: 'premium' };
}
