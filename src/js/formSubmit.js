export async function submitForm(url, formData) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error('Ошибка отправки:', error);
    }
  }
  