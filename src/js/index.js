import { initializePhoneMask } from './formMask'
import { validateForm } from './formValidation'
import { submitForm } from './formSubmit'
import { initializeModal } from './modal'
import '../scss/styles.scss'
import '../scss/form.scss'

initializePhoneMask()
initializeModal()

const form = document.getElementById('contactForm')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  if (validateForm(form)) {
    const formData = new FormData(form)
    const response = await submitForm('/submit', formData)

    if (response.status === 'success') {
      form.reset()
      alert(response.msg)
    } else if (response.status === 'error') {
      for (const field in response.fields) {
        const input = document.getElementById(field)
        if (input) {
          showError(input, response.fields[field])
        }
      }
    }
  }
})

function showError(input, message) {
  const error = document.createElement('div')
  error.className = 'error'
  error.innerText = message
  input.after(error)
}
