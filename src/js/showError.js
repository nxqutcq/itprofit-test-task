export function showError(input, message) {
  const error = document.createElement('div')
  error.className = 'error'
  error.innerText = message
  input.after(error)
}
