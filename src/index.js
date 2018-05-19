import ModalWizard from './ModalWizard.js';

function install (Vue, opts={}) {
  if (opts.zIndex) {
    ModalWizard.setInitZIndex(zIndex);
  }

  Vue.prototype[`$${opts.name || 'modal'}`] = {
    open: ModalWizard.openModal,
    close: ModalWizard.closeModal
  };
}

export default {
  install,
  open: ModalWizard.openModal,
  close: ModalWizard.closeModal
};
