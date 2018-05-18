import ModalWizard from './ModalWizard.js';
import Vue from 'vue';

function install (Vue, opts={}) {
  if (opts.zIndex) {
    ModalWizard.setInitZIndex(zIndex);
  }

  Vue.prototype[`$${opts.openModalName || 'openModal'}`] = ModalWizard.openModal;
  Vue.prototype[`$${opts.closeModalName || 'closeModal'}`] = ModalWizard.closeModal;
}

export default {
  install,
  openModal: ModalWizard.openModal,
  closeModal: ModalWizard.closeModal
};
