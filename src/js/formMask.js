import IMask from 'imask'

export function initializePhoneMask() {
  const phoneInput = document.getElementById('phone')
  if (phoneInput) {
    IMask(phoneInput, { mask: '+{375}(00)000-00-00' })
  }
}
