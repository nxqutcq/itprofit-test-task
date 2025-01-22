const modal = document.getElementById('modal')
const openModal = document.getElementById('openModal')
const closeModal = document.getElementById('closeModal')

export function initializeModal() {
  openModal.addEventListener('click', () => {
    document.body.classList.add('modal-open')
    modal.classList.add('active')
  })
  closeModal.addEventListener('click', () => {
    document.body.classList.remove('modal-open')
    modal.classList.remove('active')
  })
}
