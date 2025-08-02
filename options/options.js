import { saveOptions, getOptions } from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
  const { apiUrl = '' } = await getOptions();
  document.getElementById('api-url').value = apiUrl;
});

document.getElementById('api-url').addEventListener('change', async (e) => {
  await saveOptions({ apiUrl: e.target.value });
});
