document.getElementById('translate').addEventListener('click', () => {
  const text = document.getElementById('text').value;
  chrome.runtime.sendMessage({ type: 'TRANSLATE', text }, (result) => {
    document.getElementById('result').textContent = result || '';
  });
});
