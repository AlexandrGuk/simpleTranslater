// Handles text selection and requests translations
const handleSelection = () => {
  const text = window.getSelection().toString().trim();
  if (text) {
    chrome.runtime.sendMessage({ type: 'TRANSLATE', text }, (result) => {
      console.log('Translation result:', result);
    });
  }
};

document.addEventListener('mouseup', handleSelection);
