import { initializeValidation } from './formValidation'
import { submitForm } from './formSubmit'
import { showToast } from './showToast'
import { initializeModal } from './modal'
import '../scss/styles.scss'
import '../scss/_form.scss'

const API_URL = 'http://localhost:5000/submit'
const TOAST_MESSAGES = {
  FORM_SUCCESS: 'Форма отправлена',
  FORM_ERROR: 'Форма содержит ошибки. Проверьте введенные данные.',
  SERVER_ERROR: 'Ошибка отправки данных на сервер: ',
  VALIDATION_ERROR: 'Ошибка валидации формы.',
}

initializeModal()

const form = document.querySelector('.contactForm')
const validateForm = initializeValidation(form)

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  if (validateForm()) {
    await handleFormSubmit(form)
  } else {
    showToast(TOAST_MESSAGES.FORM_ERROR, 'error')
  }
})

async function handleFormSubmit(form) {
  const formData = new FormData(form)

  try {
    const response = await submitForm(API_URL, formData)

    if (response.status === 'success') {
      form.reset()
      showToast(TOAST_MESSAGES.FORM_SUCCESS)
    } else if (response.status === 'error') {
      handleValidationErrors(response.fields)
      showToast(TOAST_MESSAGES.VALIDATION_ERROR, 'error')
    }
  } catch (error) {
    showToast(TOAST_MESSAGES.SERVER_ERROR + error.message, 'error')
  }
}

function handleValidationErrors(fields) {
  for (const field in fields) {
    const input = document.getElementById(field)
    if (input) {
      showValidationError(input, fields[field])
    }
  }
}

function showValidationError(input, message) {
  const error = input.nextElementSibling
  if (error && error.classList.contains('form__error')) {
    error.textContent = message
    error.style.display = 'block'
  }
  input.classList.add('input--error')
}
