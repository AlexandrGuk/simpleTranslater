const BUTTON = createButton();

document.addEventListener('mouseup', onSelect);
document.addEventListener('dblclick', onSelect);
document.addEventListener('click', hideTranslate);

function onSelect(event) {
    if (event.target === BUTTON || BUTTON.contains(event.target)) {
        return;
    }
    const selection = window.getSelection();
    const text = selection ? selection.toString().trim() : '';
    if (!text || !/[A-Za-z]/.test(text)) {
        return;
    }
    BUTTON.style.left = `${event.pageX}px`;
    BUTTON.style.top = `${event.pageY}px`;
    BUTTON.style.display = 'block';
    BUTTON.dataset.text = text;
    hideTooltip();
}

function createButton() {
    const button = document.createElement('div');
    const tooltip = document.createElement('div');

    tooltip.style.position = 'absolute';
    tooltip.style.display = 'none';
    tooltip.style.backgroundColor = '#504416';
    tooltip.style.color = '#ffdd55';
    tooltip.style.fontSize = '12px';
    tooltip.style.lineHeight = '1.4';
    tooltip.style.padding = '5px';
    tooltip.style.border = '1px solid black';
    tooltip.style.zIndex = '2147483647';
    tooltip.style.width = 'max-content';
    tooltip.style.maxWidth = '450px';
    tooltip.style.whiteSpace = 'pre-wrap';
    tooltip.style.left = '0';
    tooltip.style.bottom = '28px';

    button.appendChild(tooltip);
    button.id = 'simplyTranslateSpan';
    button.style.width = '24px';
    button.style.height = '24px';
    button.style.position = 'absolute';
    button.style.display = 'none';
    button.style.cursor = 'pointer';
    button.style.backgroundImage = `url(${chrome.runtime.getURL('icons/icon48.png')})`;
    button.style.backgroundSize = 'cover';
    button.style.zIndex = '2147483647';
    button.addEventListener('mousedown', (event) => {
        event.preventDefault();
        event.stopPropagation();
        requestTranslation(button.dataset.text || '', tooltip);
    });

    (document.body || document.documentElement).appendChild(button);
    return button;
}

function requestTranslation(text, tooltip) {
    tooltip.textContent = 'Загрузка...';
    tooltip.style.display = 'block';
    chrome.runtime.sendMessage({ type: 'translate', text }, (response) => {
        if (chrome.runtime.lastError || !response || !response.ok) {
            tooltip.textContent = 'Не удалось перевести';
            return;
        }
        tooltip.textContent = response.translation;
    });
}

function hideTranslate(event) {
    const selection = window.getSelection();
    if (event.target === BUTTON || BUTTON.contains(event.target) || (selection && selection.type === 'Range')) {
        return;
    }
    BUTTON.style.display = 'none';
    hideTooltip();
}

function hideTooltip() {
    const tooltip = BUTTON.firstElementChild;
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}
