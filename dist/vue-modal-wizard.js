/*
    vue-modal-wizard
    Version: 1.0.4
    Licence: MIT
    (c) Yuqiao Chen
  */
  
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global.VueModalWizard = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  function parseTimeToMillisecond(s) {
    var val = s.match(/\d*\.?\d+/g);

    if (val) {
      val = parseFloat(val.pop());
    } else {
      return 0;
    }

    if (s.indexOf('ms') === -1) {
      return parseInt('' + val * 1000);
    } else {
      return parseInt('' + val);
    }
  }

  var utils = {
    parseTimeToMillisecond: parseTimeToMillisecond
  };

  //

  var availableAnchorType = new Set(['point', 'column', 'sticky-column', 'viewport']);

  var script = {
    data: function data() {
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
      };
    },


    methods: {
      recover: function recover() {
        this.alreadyClose = false;
        this.showModal = true;
        this.lightboxOpacity = '0';

        var modalCom = this.$refs.modalCom;

        if (modalCom && modalCom._modalRecover && typeof modalCom._modalRecover === 'function') {
          modalCom._modalRecover();
        }
      },
      initStyle: function initStyle(style) {
        var _this = this;

        var modalCom = this.$refs.modalCom;

        if (modalCom && modalCom._modalStyle && typeof modalCom._modalStyle === 'function') {
          this.setStyle(modalCom._modalStyle());
        } else {
          this.setStyle(style || {});
        }

        this.visible = true;

        var anchorbox = this.$refs.anchorbox;
        modalCom = this.toArray(anchorbox.children).pop();

        modalCom.addEventListener("mousedown", function (e) {
          e.stopPropagation();
          _this.closeReady = false;
        });
        modalCom.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      },
      setStyle: function setStyle(style) {
        var _this2 = this;

        if (style.fadeDuration) {
          this.fadeDuration = utils.parseTimeToMillisecond(style.fadeDuration);
        } else {
          this.fadeDuration = 200;
        }

        this.colorChangeDuration = style.colorChangeDuration || '0.2s';

        this.lightboxColor = style.lightboxColor || 'rgba(0, 0, 0, 0.8)';

        this.transition = style.transition || null;

        this.lightboxTransitionProp = 'opacity ' + this.fadeDuration + 'ms, background-color ' + this.colorChangeDuration;

        setTimeout(function () {
          _this2.lightboxOpacity = '1';
        }, 1);
      },
      initPosition: function initPosition(position) {
        var _this3 = this;

        var modalCom = this.$refs.modalCom;

        if (modalCom && modalCom._modalFlexPosition && typeof modalCom._modalFlexPosition === 'function') {
          this.ticking = false;

          var resizeHandler = function resizeHandler() {
            _this3.setPosition(modalCom._modalFlexPosition(window.innerWidth, window.innerHeight));
            _this3.ticking = false;
          };

          resizeHandler();

          this.onResize = function () {
            if (!_this3.ticking) {
              window.requestAnimationFrame(resizeHandler);
              _this3.ticking = true;
            }
          };

          window.addEventListener('resize', this.onResize);
        } else if (!position && modalCom && modalCom._modalPosition && typeof modalCom._modalPosition === 'function') {
          this.setPosition(modalCom._modalPosition());
        } else {
          this.setPosition(position || {});
        }
      },
      setPosition: function setPosition(position) {
        var _this4 = this;

        this.position = position;

        this.$nextTick(function () {
          var anchorbox = _this4.$refs.anchorbox;
          var modal = _this4.toArray(anchorbox.children).pop();

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
            } else {
              anchorbox.style.top = position.anchorBottom ? 'auto' : '50%';
              anchorbox.style.bottom = position.anchorBottom || 'auto';
            }

            if (position.top) {
              modal.style.top = position.top;
              modal.style.bottom = 'auto';
            } else {
              modal.style.top = position.bottom ? 'auto' : '-' + modal.clientHeight / 2 + 'px';
              modal.style.bottom = position.bottom || 'auto';
            }
          }

          if (position.type !== 'viewport') {
            if (position.anchorLeft) {
              anchorbox.style.left = position.anchorLeft;
              anchorbox.style.right = 'auto';
            } else {
              anchorbox.style.left = position.anchorRight ? 'auto' : '50%';
              anchorbox.style.right = position.anchorRight || 'auto';
            }

            if (position.left) {
              modal.style.left = position.left;
              modal.style.right = 'auto';
            } else {
              modal.style.left = position.right ? 'auto' : '-' + modal.clientWidth / 2 + 'px';
              modal.style.right = position.right || 'auto';
            }
          } else {
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

            modal.style.margin = (position.top || 0) + ' 0 ' + (position.bottom || 0) + ' ' + (position.right && !position.left ? -modal.clientWidth : 0) + 'px';
          }

          if (position.type === 'sticky-column') {
            anchorbox.style.top = '0';
            anchorbox.style.bottom = '0';

            modal.style.top = position.top || '0';
            modal.style.bottom = position.bottom || '0';
          }
        });
      },
      reset: function reset() {
        this.setPosition(this.position);
      },
      close: function close() {
        var _this5 = this;

        if (this.alreadyClose) {
          return;
        }

        this.alreadyClose = true;

        this.lightboxOpacity = '0';
        this.visible = this.transition === null;

        this.closeTopModal();

        if (this.onClose && typeof this.onClose === "function") {
          this.onClose();
        }

        setTimeout(function () {
          if (typeof _this5.name === 'string') {
            _this5.showModal = false;
            _this5.visible = false;
          } else {
            _this5.doDestroy();
          }
        }, this.fadeDuration);
      },
      doDestroy: function doDestroy() {
        if (this.onResize) {
          window.removeEventListener('resize', this.onResize);
        }

        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },
      onColorChange: function onColorChange(color) {
        this.lightboxColor = color;
      },
      toArray: function toArray(input) {
        return Array.prototype.slice.call(input);
      }
    }
  };

  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function __vue_render__() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showModal, expression: "showModal" }], staticClass: "ModalWizard__Modal" }, [_c('div', { ref: "lightbox", staticClass: "background", style: {
        backgroundColor: _vm.lightboxColor,
        transition: _vm.lightboxTransitionProp,
        opacity: _vm.lightboxOpacity
      }, on: { "mousedown": function mousedown($event) {
          _vm.closeReady = true;
        }, "click": function click() {
          if (_vm.closeReady) {
            _vm.close();
          }
        } } }, [_c('div', { ref: "anchorbox", staticClass: "anchor-box" }, [_c('transition', { attrs: { "name": _vm.transition } }, [_c(_vm.contentComOpt, _vm._b({ directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], ref: "modalCom", tag: "component", on: { "reset": _vm.reset, "changeColor": _vm.onColorChange, "changePosition": _vm.setPosition } }, 'component', _vm.props, false))], 1)], 1)])]);
  };
  var __vue_staticRenderFns__ = [];

  var __vue_template__ = typeof __vue_render__ !== 'undefined' ? { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ } : {};
  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) return;
    inject("data-v-58178d27_0", { source: "\n.ModalWizard__Modal{position:fixed\n}\n.ModalWizard__Modal>.background{position:fixed;top:0;left:0;height:100%;width:100%;overflow:auto\n}\n.ModalWizard__Modal>.background>.anchor-box{position:absolute;top:0;left:50%;width:0\n}", map: undefined, media: undefined });
  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = script$$1 || {};

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      var hook = void 0;
      if (style) {
        hook = function hook(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component;
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  var Modal = __vue_normalize__(__vue_template__, __vue_inject_styles__, typeof __vue_script__ === 'undefined' ? {} : __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, typeof __vue_create_injector__ !== 'undefined' ? __vue_create_injector__ : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var ModalConstructor = Vue.extend(Modal);

  var stack = [];
  var storage = {};
  var idSeed = 1;
  var zIndexSeed = 1010;

  function openModal(content) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (content === null) return;

    var instance = null;
    var comOpt = null;

    var isCreateNew = true;

    if (opts.name) {
      instance = storage[opts.name];
      if (instance) {
        if (stack.indexOf(instance) === -1) {
          isCreateNew = false;
        } else {
          opts.name = null;
        }
      }
    }

    if (isCreateNew) {
      if (typeof content === 'function') {
        comOpt = {
          functional: true,
          render: function render(h, c) {
            return content(h, c.props);
          }
        };
      } else if (typeof content === 'string' && content.indexOf('<') !== -1) {
        comOpt = {
          template: content
        };

        if (opts['props'] && _typeof(opts['props']) === 'object') {
          comOpt.props = Object.keys(opts.props);
        }
      } else if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' || typeof content === 'string' && content.indexOf('<') === -1) {
        comOpt = content;
      } else return;

      var data = {};
      data.contentComOpt = comOpt;
      data.closeTopModal = closeTopModal;
      data.onClose = opts.onClose;
      data.props = opts.props;
      data.name = opts.name;

      instance = new ModalConstructor({
        data: data
      });

      instance.id = 'modal_' + idSeed++;
      instance.vm = instance.$mount();
      document.body.appendChild(instance.vm.$el);
      instance.dom = instance.vm.$el;

      if (opts.name) {
        storage[opts.name] = instance;
      }
    } else {
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

      document.addEventListener('keydown', escDetect);
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

  var ModalWizard = {
    openModal: openModal,
    closeModal: closeModal,
    setInitZIndex: setInitZIndex
  };

  function install(Vue$$1) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (opts.zIndex) {
      ModalWizard.setInitZIndex(zIndex);
    }

    Vue$$1.prototype['$' + (opts.name || 'modal')] = {
      open: ModalWizard.openModal,
      close: ModalWizard.closeModal
    };
  }

  var index = {
    install: install,
    open: ModalWizard.openModal,
    close: ModalWizard.closeModal
  };

  return index;

})));
