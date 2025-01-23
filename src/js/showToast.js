export function showToast(message, type = 'success') {
  const toast = document.createElement('div')
  toast.classList.add('toast', type)
  toast.textContent = message

  const container = document.getElementById('toast-container')
  container.appendChild(toast)

  setTimeout(() => {
    toast.classList.add('show')
  }, 10)

  setTimeout(() => {
    toast.classList.remove('show')
    toast.remove()
  }, 3000)
}
