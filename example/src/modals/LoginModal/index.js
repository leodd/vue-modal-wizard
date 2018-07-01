import ModalWizard from 'vue-modal-wizard'
import LoginModal from './LoginModal.vue'

function open () {
  ModalWizard.open(LoginModal)
}

export default open
