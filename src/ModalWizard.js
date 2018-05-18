import Vue from 'vue';
import Modal from './Modal.vue';

const ModalConstructor = Vue.extend(Modal);

const stack = [];
const storage = {};
let idSeed = 1;
let zIndexSeed = 1010;

function openModal(content, opts={}) {
  if (content === null) return;

  let instance = null;
  let comOpt = null;

  let isCreateNew = true;

  if (opts.name) {
    instance = storage[opts.name];
    if (instance) {
      if (stack.indexOf(instance) === -1) {
        isCreateNew = false;
      }
      else {
        opts.name = null;
      }
    }
  }

  if (isCreateNew) {
    if (typeof content === 'function') {
      comOpt = {
        functional: true,
        render: (h, c) => content(h, c.props)
      };
    }
    else if (typeof content === 'string' && content.indexOf('<') !== -1) {
      comOpt = {
        template: content
      };

      if (opts['props'] && typeof opts['props'] === 'object') {
        comOpt.props = Object.keys(opts.props);
      }
    }
    else if (typeof content === 'object' || (typeof content === 'string' && content.indexOf('<') === -1)) {
      comOpt = content;
    }
    else return;

    let data = {};
    data.contentComOpt = comOpt;
    data.closeTopModal = closeTopModal;
    data.onClose = opts.onClose;
    data.props = opts.props;
    data.name = opts.name;

    instance = new ModalConstructor({
      data: data
    });

    instance.id = `modal_${idSeed++}`;
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.dom = instance.vm.$el;

    if (opts.name) {
      storage[opts.name] = instance;
    }
  }
  else {
    instance.vm.props = opts.props;
    instance.recover();
  }

  instance.dom.style.zIndex = zIndexSeed++;

  instance.vm.initStyle(opts.style);
  instance.vm.initPosition(opts.position);

  if (opts.escOff) {
    instance.escOff = true;
  }

  stack.push(instance);

  if (stack.length <= 1) {
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', escDetect)
  }
}

function closeModal() {
  if (stack.length > 0) {
    stack[stack.length - 1].close();
  }
}

function closeTopModal() {
  stack.pop();

  zIndexSeed--;

  if (stack.length <= 0) {
    document.body.style.overflow = 'auto';

    document.removeEventListener('keydown', escDetect);
  }
}

function escDetect(e) {
  e = e || window.event;

  if (e.keyCode === 27 && stack.length > 0 && !stack[stack.length - 1].escOff) {
    stack[stack.length - 1].close();
  }
}

function setInitZIndex(zIndex) {
  zIndexSeed = zIndex;
}

export default {
  openModal,
  closeModal,
  setInitZIndex
}
