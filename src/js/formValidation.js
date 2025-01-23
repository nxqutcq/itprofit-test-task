import { showError } from './ShowError'

export function validateForm(form) {
  let isValid = true
  const inputs = form.querySelectorAll('input, textarea')

  inputs.forEach((input) => {
    const error = input.nextElementSibling
    if (error) error.remove()

    if (!input.value.trim()) {
      showError(input, 'Это поле обязательно')
      isValid = false
    } else if (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value)) {
      showError(input, 'Некорректный email')
      isValid = false
    }
  })

  return isValid
}
