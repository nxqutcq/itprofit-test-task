export async function submitForm(url, formData) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (!response.ok) {
    throw new Error('Ошибка при отправке данных');
  }

  return await response.json();
}