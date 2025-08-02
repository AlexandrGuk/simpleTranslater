export function saveOptions(options) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(options, resolve);
  });
}

export function getOptions() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, resolve);
  });
}
