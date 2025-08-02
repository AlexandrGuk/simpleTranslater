export async function translateText(text) {
  // Placeholder API call; replace with actual backend URL
  const response = await fetch('https://example.com/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  const data = await response.json();
  return data.translation || '';
}
