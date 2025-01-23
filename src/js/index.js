import { initializePhoneMask } from './formMask'
import { validateForm } from './formValidation'
import { submitForm } from './formSubmit'
import { showToast } from './showToast'
import { initializeModal } from './modal'
import '../scss/styles.scss'
import '../scss/form.scss'
import { showError } from './ShowError'

initializePhoneMask()
initializeModal()

const form = document.getElementById('contactForm')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  if (validateForm(form)) {
    const formData = new FormData(form)
    try {
      const response = await submitForm(
        'http://localhost:5000/submit',
        formData
      )

      if (response.status === 'success') {
        form.reset();
        showToast(response.msg)
      } else if (response.status === 'error') {
        for (const field in response.fields) {
          const input = document.getElementById(field)
          if (input) {
            showError(input, response.fields[field])
          }
        }
        showToast('Ошибка валидации формы.', 'error')
      }
    } catch (error) {
      showToast('Ошибка отправки данных на сервер: ' + error.message, 'error')
    }
  } else {
    showToast('Форма содержит ошибки. Проверьте введенные данные.', 'error')
  }
})
