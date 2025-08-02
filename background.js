import { translateText } from './utils/api.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TRANSLATE') {
    translateText(message.text).then(sendResponse);
    return true; // keep the message channel open for async response
  }
});
