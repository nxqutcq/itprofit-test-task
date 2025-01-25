import { initializeValidation } from './formValidation'
import { submitForm } from './formSubmit'
import { showToast } from './showToast'
import { initializeModal } from './modal'
import '../scss/styles.scss'
import '../scss/_form.scss'

initializeModal()

const form = document.querySelector('.contactForm')

const validateForm = initializeValidation(form)

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const isValid = validateForm()

  if (isValid) {
    const formData = new FormData(form)

    try {
      const response = await submitForm(
        'http://localhost:5000/submit',
        formData
      )

      if (response.status === 'success') {
        form.reset()
        showToast('Форма отправлена')
      } else if (response.status === 'error') {
        handleValidationErrors(response.fields)
        showToast('Ошибка валидации формы.', 'error')
      }
    } catch (error) {
      showToast('Ошибка отправки данных на сервер: ' + error.message, 'error')
    }
  } else {
    showToast('Форма содержит ошибки. Проверьте введенные данные.', 'error')
  }
})

function handleValidationErrors(fields) {
  for (const field in fields) {
    const input = document.getElementById(field)
    if (input) {
      const error = input.nextElementSibling
      if (error && error.classList.contains('form__error')) {
        error.textContent = fields[field]
        error.style.display = 'block'
      }
      input.classList.add('input--error')
    }
  }
}
