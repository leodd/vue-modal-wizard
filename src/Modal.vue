<template>
  <div class="ModalWizard__Modal" v-show="showModal">
    <div class="background" ref="lightbox" @mousedown="closeReady = true" @click="() => {if (closeReady) close()}"
         :style="{
         backgroundColor: lightboxColor,
         transition: lightboxTransitionProp,
         opacity: lightboxOpacity
         }">
      <div class="anchor-box" ref="anchorbox">
        <transition :name="transition">
          <component :is="contentComOpt"
                     v-bind="props"
                     ref="modalCom"
                     v-show="visible"
                     @changeColor="onColorChange"
                     @changePosition="setPosition"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type="text/jsx">
  import utils from './utils.js';

  const availableAnchorType = new Set(['point', 'column', 'sticky-column', 'viewport']);

  export default {
    data() {
      return {
        visible: false,
        showModal: true,
        closeReady: false,
        onClose: null,
        closeTopModal: null,
        contentComOpt: null,
        props: null,
        fadeDuration: 200,
        colorChangeDuration: '0.2s',
        transition: null,
        lightboxColor: 'rgba(0, 0, 0, 0.8)',
        lightboxTransitionProp: '',
        lightboxOpacity: '0',
        name: null
      }
    },

    methods: {
      recover() {
        this.alreadyClose = false;
        this.showModal = true;
        this.lightboxOpacity = '0';

        let modalCom = this.$refs.modalCom;

        if (modalCom && modalCom._modalRecover && typeof modalCom._modalRecover === 'function') {
          modalCom._modalRecover();
        }
      },

      initStyle(style) {
        let modalCom = this.$refs.modalCom;

        if (modalCom && modalCom._modalStyle && typeof modalCom._modalStyle === 'function') {
          this.setStyle(modalCom._modalStyle());
        }
        else {
          this.setStyle(style || {});
        }

        this.visible = true;

        let anchorbox = this.$refs.anchorbox;
        modalCom = this.toArray(anchorbox.children).pop();

        modalCom.addEventListener("mousedown", e => {
          e.stopPropagation();
          this.closeReady = false;
        });
        modalCom.addEventListener("click", e => {
          e.stopPropagation();
        });
      },

      setStyle(style) {
        if (style.fadeDuration) {
          this.fadeDuration = utils.parseTimeToMillisecond(style.fadeDuration);
        }
        else {
          this.fadeDuration = 200;
        }

        this.colorChangeDuration = style.colorChangeDuration || '0.2s';

        this.lightboxColor = style.lightboxColor || 'rgba(0, 0, 0, 0.8)';

        this.transition = style.transition || null;

        this.lightboxTransitionProp = `opacity ${this.fadeDuration}ms, background-color ${this.colorChangeDuration}`;

        setTimeout(() => {
          this.lightboxOpacity = '1';
        }, 1);
      },

      initPosition(position) {
        let modalCom = this.$refs.modalCom;

        if (modalCom && modalCom._modalFlexPosition && typeof modalCom._modalFlexPosition === 'function') {
          this.ticking = false;

          let resizeHandler = () => {
            this.setPosition(modalCom._modalFlexPosition(window.innerWidth, window.innerHeight));
            this.ticking = false;
          };

          resizeHandler();

          this.onResize = () => {
            if (!this.ticking) {
              window.requestAnimationFrame(resizeHandler);
              this.ticking = true;
            }
          };

          window.addEventListener('resize', this.onResize);
        }
        else if (!position && modalCom && modalCom._modalPosition && typeof modalCom._modalPosition === 'function') {
          this.setPosition(modalCom._modalPosition());
        }
        else {
          this.setPosition(position || {});
        }
      },

      setPosition(position) {
        this.$nextTick(() => {
          let anchorbox = this.$refs.anchorbox;
          let modal = this.toArray(anchorbox.children).pop();

          if (!position.type || !availableAnchorType.has(position.type)) {
            position.type = 'point';
          }

          anchorbox.style.position = 'absolute';
          modal.style.position = 'absolute';
          anchorbox.style.width = '0';
          modal.style.margin = '0';

          if (position.type === 'point') {
            if (position.anchorTop) {
              anchorbox.style.top = position.anchorTop;
              anchorbox.style.bottom = 'auto';
            }
            else {
              anchorbox.style.top = position.anchorBottom ? 'auto' : '50%';
              anchorbox.style.bottom = position.anchorBottom || 'auto';
            }

            if (position.top) {
              modal.style.top = position.top;
              modal.style.bottom = 'auto';
            }
            else {
              modal.style.top = position.bottom ? 'auto' : `-${modal.clientHeight / 2}px`;
              modal.style.bottom = position.bottom || 'auto';
            }
          }

          if (position.type !== 'viewport') {
            if (position.anchorLeft) {
              anchorbox.style.left = position.anchorLeft;
              anchorbox.style.right = 'auto';
            }
            else {
              anchorbox.style.left = position.anchorRight ? 'auto' : '50%';
              anchorbox.style.right = position.anchorRight || 'auto';
            }

            if (position.left) {
              modal.style.left = position.left;
              modal.style.right = 'auto';
            }
            else {
              modal.style.left = position.right ? 'auto' : `-${modal.clientWidth / 2}px`;
              modal.style.right = position.right || 'auto';
            }
          }
          else {
            anchorbox.style.top = '0';
            anchorbox.style.bottom = '0';
            anchorbox.style.left = '0';
            anchorbox.style.right = '0';

            modal.style.top = position.top || '0';
            modal.style.bottom = position.bottom || '0';
            modal.style.left = position.left || '0';
            modal.style.right = position.right || '0';

            anchorbox.style.width = 'auto';
          }

          if (position.type === 'column') {
            modal.style.position = 'relative';

            anchorbox.style.top = '0';
            anchorbox.style.bottom = 'auto';

            modal.style.top = 'auto';
            modal.style.bottom = 'auto';

            modal.style.margin =
              `${position.top || 0} 0 ${position.bottom || 0} ${position.right && !position.left ? -modal.clientWidth : 0}px`;
          }

          if (position.type === 'sticky-column') {
            anchorbox.style.top = '0';
            anchorbox.style.bottom = '0';

            modal.style.top = position.top || '0';
            modal.style.bottom = position.bottom || '0';
          }
        });
      },

      close() {
        if (this.alreadyClose) {return;}

        this.alreadyClose = true;

        this.lightboxOpacity = '0';
        this.visible = this.transition === null;

        this.closeTopModal();

        if (this.onClose && typeof this.onClose === "function") {
          this.onClose();
        }

        setTimeout(() => {
          if (typeof this.name === 'string') {
            this.showModal = false;
            this.visible = false;
          }
          else {
            this.doDestroy();
          }
        }, this.fadeDuration);
      },

      doDestroy() {
        if (this.onResize) {
          window.removeEventListener('resize', this.onResize);
        }

        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      onColorChange(color) {
        this.lightboxColor = color;
      },

      toArray(input) {
        return Array.prototype.slice.call(input);
      }
    }
  }
</script>

<style lang="scss">
  .ModalWizard__Modal {
    position: fixed;

    & > .background {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      overflow: auto;

      & > .anchor-box {
        position: absolute;
        top: 0;
        left: 50%;
        width: 0;
      }
    }
  }
</style>
