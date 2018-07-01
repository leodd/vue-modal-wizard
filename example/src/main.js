import Vue from 'vue'
import App from './App.vue'
import ModalWizard from 'vue-modal-wizard'

Vue.use(ModalWizard)

new Vue({
  el: '#app',
  render: h => h(App)
})
