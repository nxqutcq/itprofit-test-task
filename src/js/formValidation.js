import IMask from 'imask'

export function initializeValidation(form) {
  const inputs = form.querySelectorAll('input, textarea')

  const nameInput = form.querySelector('#name')
  const phoneInput = form.querySelector('#phone')
  const emailInput = form.querySelector('#email')
  const messageInput = form.querySelector('#message')

  const showError = (input, message) => {
    const error = input.parentElement.querySelector('.form__error')
    if (error) {
      error.textContent = message
      error.style.display = 'block'
    }
    input.classList.add('input--error')
  }

  const resetError = (input) => {
    const error = input.parentElement.querySelector('.form__error')
    if (error) {
      error.textContent = ''
      error.style.display = 'none'
    }
    input.classList.remove('input--error')
  }

  const validateName = (input) => {
    const namePattern = /^[a-zA-Zа-яА-ЯЁё\s\-]+$/
    if (!input.value.trim()) {
      showError(input, 'Это поле обязательно')
      return false
    } else if (!namePattern.test(input.value)) {
      showError(input, 'Разрешены только буквы, пробелы и дефисы')
      return false
    }
    return true
  }

  const validatePhone = (input) => {
    const mask = IMask(input, { mask: '+{375}(00)000-00-00' })
    if (!mask.masked.isComplete) {
      showError(input, 'Номер телефона заполнен некорректно.')
      return false
    } else if (mask.unmaskedValue.length < 12) {
      showError(input, 'Номер должен содержать не менее 12 цифр.')
      return false
    }
    return true
  }

  const validateEmail = (input) => {
    if (!input.value.trim()) {
      showError(input, 'Это поле обязательно')
      return false
    } else if (!/\S+@\S+\.\S+/.test(input.value)) {
      showError(input, 'Некорректный email')
      return false
    }
    return true
  }

  const validateMessage = (input) => {
    if (!input.value.trim()) {
      showError(input, 'Это поле обязательно')
      return false
    }
    return true
  }

  const validateInput = (input) => {
    if (input === nameInput) {
      return validateName(input)
    } else if (input === phoneInput) {
      return validatePhone(input)
    } else if (input === emailInput) {
      return validateEmail(input)
    } else if (input === messageInput) {
      return validateMessage(input)
    } else if (!input.value.trim()) {
      showError(input, 'Это поле обязательно')
      return false
    }
    return true
  }

  inputs.forEach((input) => {
    input.addEventListener('input', () => resetError(input))
    input.addEventListener('blur', () => validateInput(input))
  })

  return () => {
    let isValid = true
    inputs.forEach((input) => {
      if (!validateInput(input)) {
        isValid = false
      }
    })
    return isValid
  }
}
