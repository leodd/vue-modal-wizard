import ModalWizard from 'vue-modal-wizard'

function open (index=1) {
  ModalWizard.open(`
  <div class="infinite-modal">
    modal
    <br>
    #{{ index }}
    <span class="button" @click="onClick">OPEN NEW</span>
  </div>
  `, {
    props: {
      index: index,
      onClick: () => {
        open(index + 1)
      }
    },

    position: {
      type: 'point',
      left: `${Math.random() * 100 - 200}px`,
      top: `${Math.random() * 100 - 200}px`
    }
  })
}

export default open
